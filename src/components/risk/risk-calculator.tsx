"use client";

import { useId, useState } from "react";
import { LOT_LADDER, RISK } from "@/lib/content";

const usd = (n: number): string => `$${n.toLocaleString("en-US")}`;
const lot = (n: number): string => n.toFixed(2);

/**
 * The lot-size ladder from risk_man.jpeg, as a control rather than a table.
 * The table is still underneath as reference, but the slider is what makes the
 * data useful — and "we take sizing seriously" lands better as a tool than as
 * a bullet point claiming it.
 */
export function RiskCalculator() {
  const [index, setIndex] = useState(6);
  const sliderId = useId();
  const row = LOT_LADDER[index];

  return (
    <div className="border-line bg-surface rounded-2xl border p-6 sm:p-8">
      <label htmlFor={sliderId} className="text-muted block text-[0.9375rem]">
        {RISK.calculatorLabel}
      </label>

      <output htmlFor={sliderId} className="tnum text-ink mt-2 block text-4xl font-medium tracking-tight">
        {usd(row.balance)}
      </output>

      <input
        id={sliderId}
        type="range"
        min={0}
        max={LOT_LADDER.length - 1}
        step={1}
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
        aria-valuetext={`${usd(row.balance)} account, maximum ${lot(row.lot)} lots per trade`}
        className="accent-accent mt-6 w-full cursor-pointer"
      />

      <div className="text-faint mt-2 flex justify-between font-mono text-[0.6875rem]">
        <span>{usd(LOT_LADDER[0].balance)}</span>
        <span>{usd(LOT_LADDER[LOT_LADDER.length - 1].balance)}</span>
      </div>

      <div className="border-line mt-7 border-t pt-6">
        <p className="text-muted text-[0.9375rem]">{RISK.resultLabel}</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="tnum text-accent text-4xl font-medium tracking-tight">
            {lot(row.lot)}
          </span>
          <span className="text-muted text-sm">lots</span>
        </p>
      </div>

      <p className="text-faint mt-6 text-xs leading-relaxed text-pretty">{RISK.note}</p>
    </div>
  );
}
