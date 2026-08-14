import type { ReactNode } from "react";
import { BROKER, BROKER_TOKEN, LINKS, SIGNAL_ANATOMY } from "@/lib/content";

/**
 * Paid broker placement.
 *
 * The disclosure sits next to the link in every variant, never in the footer
 * alone — the FTC Endorsement Guides (16 CFR 255.5) and the UK CAP Code both
 * require a material connection to be disclosed clearly and in proximity to
 * the endorsement. `rel="sponsored"` marks the paid relationship for crawlers.
 */

type BrokerLinkProps = {
  readonly label?: string;
  readonly className?: string;
};

export function BrokerLink({ label = BROKER.shortCta, className = "" }: BrokerLinkProps) {
  return (
    <a
      href={LINKS.broker}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}

const LINK_STYLE =
  "text-accent underline decoration-accent/35 underline-offset-2 transition-colors duration-300 hover:decoration-accent hover:duration-50";

/**
 * Splits a string on the `{{XM}}` token and renders each occurrence as a link
 * to the broker. Keeps every mention of the broker clickable without fragile
 * matching on the bare word.
 */
export function withBrokerLinks(text: string): ReactNode[] {
  const parts = text.split(BROKER_TOKEN);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i > 0) {
      nodes.push(<BrokerLink key={`xm-${i}`} label={BROKER.name} className={LINK_STYLE} />);
    }
    if (part) nodes.push(part);
  });
  return nodes;
}

/** Closing note for the signal-anatomy section — a note, not a CTA block, so
 *  it doesn't interrupt the explanation it sits under. */
export function BrokerNote() {
  return (
    <div className="border-line bg-sunken mt-8 rounded-xl border p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="text-ink text-[0.9375rem]">
          {SIGNAL_ANATOMY.brokerLead}{" "}
          <span className="text-muted">
            We trade on <BrokerLink label={BROKER.name} className={LINK_STYLE} />.
          </span>
        </p>
        <p className="text-faint mt-1.5 text-xs leading-relaxed text-pretty">
          {BROKER.disclosure}
        </p>
      </div>
      <BrokerLink className="btn btn-secondary mt-4 w-full shrink-0 sm:mt-0 sm:w-auto" />
    </div>
  );
}
