import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/year/")({
  beforeLoad: () => {
    const now = new Date();
    const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
    throw redirect({ to: "/year/$year", params: { year: String(ist.getFullYear()) } });
  },
});
