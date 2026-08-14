import { Reveal } from "./reveal";

type SectionHeadProps = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body?: string;
  readonly align?: "left" | "center";
};

export function SectionHead({ eyebrow, heading, body, align = "left" }: SectionHeadProps) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-label text-accent uppercase">{eyebrow}</p>
      <h2 className="text-h2 text-ink mt-3 text-balance">{heading}</h2>
      {body ? <p className="text-lead text-muted mt-4 text-pretty">{body}</p> : null}
    </Reveal>
  );
}
