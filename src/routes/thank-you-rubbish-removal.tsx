import { createFileRoute } from "@tanstack/react-router";
import { ThankYou } from "@/components/site/ThankYou";

export const Route = createFileRoute("/thank-you-rubbish-removal")({
  head: () => ({
    meta: [
      { title: "Thank you — Demo Bros" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ThankYou source="rubbish-removal" homePath="/rubbish-removal" />
  ),
});
