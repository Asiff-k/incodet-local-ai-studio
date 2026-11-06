import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { site } from "@/config/site";
import { contactPayload, MIN_FILL_MS, planLabels, RATE_LIMIT_PER_HOUR } from "./contact-schema";

type Result = { ok: true } | { ok: false; error: string };

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Public contact form endpoint ("submit-contact"). Validates, filters spam, stores, optionally emails. */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = contactPayload.safeParse(input);
    return parsed.success ? { ok: true as const, data: parsed.data } : { ok: false as const };
  })
  .handler(async ({ data: input }): Promise<Result> => {
    if (!input.ok) return { ok: false, error: "Please check the form and try again." };
    const d = input.data;

    // Honeypot or too-fast submit: pretend success, store nothing.
    if (d.website) return { ok: true };
    if (Date.now() - d.rendered_at < MIN_FILL_MS) return { ok: true };

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const ip =
        getRequestHeader("cf-connecting-ip") ||
        getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown";
      const ipHash = await sha256(`incodet:${ip}`);
      const since = new Date(Date.now() - 3600_000).toISOString();

      const { count } = await supabaseAdmin
        .from("contact_rate_limits")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);
      if ((count ?? 0) >= RATE_LIMIT_PER_HOUR) {
        return { ok: false, error: "Too many messages from this connection. Please try again later." };
      }
      await supabaseAdmin.from("contact_rate_limits").insert({ ip_hash: ipHash });

      const { data: row, error } = await supabaseAdmin
        .from("contact_messages")
        .insert({
          name: d.name,
          email: d.email,
          business_name: d.business_name || null,
          plan: d.plan,
          message: d.message,
          source_page: d.source_page,
        })
        .select("id")
        .single();
      if (error || !row) {
        console.error("contact insert failed", error);
        return { ok: false, error: "Could not send your message." };
      }

      const key = process.env["RESEND_API_KEY"];
      if (!key) {
        console.log("email skipped: no RESEND_API_KEY");
        return { ok: true };
      }
      const text = [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Business: ${d.business_name || "Not given"}`,
        `Plan: ${planLabels[d.plan]}`,
        `Page: ${d.source_page}`,
        "",
        "Message:",
        d.message,
      ].join("\n");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Incodet Website <noreply@incodet.com>",
          to: [site.email],
          reply_to: d.email,
          subject: `New enquiry from ${d.name}`,
          text,
        }),
      });
      if (res.ok) {
        await supabaseAdmin.from("contact_messages").update({ email_sent: true }).eq("id", row.id);
      } else {
        console.error(`email failed [${res.status}]: ${await res.text()}`);
      }
      return { ok: true };
    } catch (e) {
      console.error("submitContact error", e);
      return { ok: false, error: "Could not send your message." };
    }
  });
