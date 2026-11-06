import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function CalInline({ calLink }: { calLink: string }) {
  useEffect(() => {
    getCalApi().then((cal) => {
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#0A0A0A" }, dark: { "cal-brand": "#0A0A0A" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    });
  }, []);
  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: 600, overflow: "auto" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
