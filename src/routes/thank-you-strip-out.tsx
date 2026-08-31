import { createFileRoute } from "@tanstack/react-router";
import { ThankYou } from "@/components/site/ThankYou";

export const Route = createFileRoute("/thank-you-strip-out")({
  head: () => ({
    meta: [
      { title: "Thank you — Demo Bros" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ThankYou source="strip-out" homePath="/strip-out" />,
});
