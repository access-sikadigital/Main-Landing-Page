import { Reveal } from "./Reveal";

/** Which background the heading is sitting on. */
export type SectionTone = "light" | "charcoal" | "green";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: SectionTone;
}

/**
 * A tone per background rather than an `onDark` boolean.
 *
 * Two backgrounds could be handled with a flag; three cannot, and the green one
 * is not simply "dark" — it needs the eyebrow retinted as well, because the
 * eyebrow's default colour IS the green it would be sitting on.
 */
const TONE: Record<SectionTone, { wrap: string; title: string; description: string }> = {
  light: { wrap: "", title: "text-foreground", description: "text-muted-foreground" },
  charcoal: { wrap: "", title: "text-secondary", description: "text-secondary/70" },
  green: {
    // Retints the eyebrow via the variable the utility reads.
    wrap: "[--eyebrow-color:var(--color-primary-foreground)]",
    title: "text-primary-foreground",
    // /90 rather than /70: this is body copy on a mid-tone green, and every
    // step of transparency is contrast spent.
    description: "text-primary-foreground/90",
  },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const t = TONE[tone];

  return (
    <Reveal
      className={`${t.wrap} ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      {/* The `eyebrow` utility is fluid — it handles its own narrow-screen
          sizing, so there is nothing to override here. */}
      <p className="eyebrow">{eyebrow}</p>
      {/* Display sizes pulled back roughly a third. Oversized Akira was the main
          thing making the page read expensive rather than approachable. */}
      <h2
        className={`font-heading mt-3 text-[1.15rem] sm:text-balance sm:text-2xl lg:text-[1.75rem] ${t.title}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-[0.95rem] leading-relaxed sm:text-base ${t.description}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
