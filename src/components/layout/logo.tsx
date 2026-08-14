import Image from "next/image";
import { BRAND } from "@/lib/content";

type LogoProps = {
  readonly onPanel?: boolean;
  readonly className?: string;
};

/**
 * The real brand mark: the gold "G" extracted from content/logo.jpeg with its
 * flat #181411 background keyed out and edges un-premultiplied, so it carries
 * no dark halo on the light canvas.
 *
 * The mark is paired with a typeset wordmark rather than the full supplied
 * lockup. The lockup bakes "Gold signals" inside the G's bowl at roughly a
 * tenth of the mark's height — at the 30px a nav allows, that text renders
 * about 4px tall and is unreadable. Public/logo-lockup.png holds the full
 * lockup (with its pale wordmark recoloured to ink so it survives on white) if
 * the whole thing is ever wanted at display size.
 */
export function Logo({ onPanel = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-mark.png"
        alt=""
        width={128}
        height={123}
        className="h-7 w-auto"
      />
      <span
        className={`text-[0.9375rem] font-semibold tracking-[-0.02em] ${
          onPanel ? "text-panel-ink" : "text-ink"
        }`}
      >
        {BRAND.wordmark.lead}
        <span className={`font-normal ${onPanel ? "text-panel-muted" : "text-muted"}`}>
          {" "}
          {BRAND.wordmark.tail}
        </span>
      </span>
    </span>
  );
}
