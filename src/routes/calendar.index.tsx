import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar/")({
  beforeLoad: () => {
    const now = new Date();
    const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
    throw redirect({
      to: "/calendar/$year/$month",
      params: { year: String(ist.getFullYear()), month: String(ist.getMonth() + 1) },
    });
  },
});
