import { GoldChart } from "./gold-chart";
import { SignalCard } from "./signal-card";
import { SignalFocusProvider } from "./signal-focus";

/**
 * The signature composition: one dark surface holding the chart and the signal
 * card, both describing the same trade. This is the only dark element on the
 * page, and the only place gold appears — it fails contrast on the light
 * canvas but reads at 7.1:1 here.
 */
export function HeroPanel() {
  return (
    <div className="panel-wrap seq-rise w-full" style={{ animationDelay: "150ms" }}>
      <div className="panel-bezel">
        <div className="panel-screen p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="tnum text-panel-ink text-sm font-medium">XAUUSD</span>
              <span className="text-panel-muted font-mono text-[0.6875rem]">M5</span>
            </div>
            <span className="text-panel-muted font-mono text-[0.6875rem]">Illustrative</span>
          </div>

          {/* The provider is a client component, but the chart and card are
              passed through as children and so keep server-rendering. */}
          <SignalFocusProvider>
            <div className="mt-3 grid items-center gap-4 lg:grid-cols-[1fr_15rem] lg:gap-5">
              <GoldChart />
              <SignalCard />
            </div>
          </SignalFocusProvider>
        </div>
      </div>
    </div>
  );
}
