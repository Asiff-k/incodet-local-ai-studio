<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Contact details, socials and hero media live only in src/config/site.ts; components read from it so brand data changes in one place.
- Shared site UI lives in src/components/site; typography utilities are named type-* (not text-*) so they never clash with color classes in cn/tailwind-merge.

- Industry pages share one template (src/components/site/IndustryPage.tsx) fed by src/content/industries.ts; add industries by data, not new layouts.
- Case study detail pages are data-driven from src/content/caseStudies.ts and render only sections that have data.
- Contact form submissions go through the `submitContact` server function (src/lib/contact.functions.ts), which inserts with the admin client; contact_messages has no public insert policy so spam checks cannot be bypassed.
- Owner notification emails use Resend directly only when the RESEND_API_KEY secret exists; without it the row is saved and sending is skipped, so the form never depends on email.
