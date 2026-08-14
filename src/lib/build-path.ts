export type ChartPoint = { readonly x: number; readonly y: number };

export type ChartPaths = {
  readonly line: string;
  readonly area: string;
  readonly points: readonly ChartPoint[];
  /** Maps a data-space value back to a y coordinate, for price markers. */
  readonly yFor: (value: number) => number;
};

export type BuildOptions = {
  readonly width: number;
  readonly height: number;
  readonly padding?: number;
  /** 0 = polyline, ~0.18 = gentle curve. */
  readonly smoothing?: number;
  /** Override the auto min/max — needed when markers sit outside the series. */
  readonly domain?: readonly [number, number];
};

/**
 * Turns a value series into a smoothed cubic `d` string plus a closed area path.
 *
 * Coordinates are rounded to two decimals deliberately: float formatting can
 * differ between server and client, and an SVG `d` attribute that differs by
 * one digit is a hydration mismatch.
 */
export function buildPaths(
  values: readonly number[],
  { width, height, padding = 8, smoothing = 0.18, domain }: BuildOptions,
): ChartPaths {
  const noop: ChartPaths = { line: "", area: "", points: [], yFor: () => 0 };
  if (values.length < 2) return noop;

  const min = domain ? domain[0] : Math.min(...values);
  const max = domain ? domain[1] : Math.max(...values);
  const span = max - min || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const yFor = (value: number): number =>
    Number((padding + innerH - ((value - min) / span) * innerH).toFixed(2));

  const points: readonly ChartPoint[] = values.map((value, i) => ({
    x: Number((padding + (i / (values.length - 1)) * innerW).toFixed(2)),
    y: yFor(value),
  }));

  const controlPoint = (
    current: ChartPoint,
    previous: ChartPoint | undefined,
    next: ChartPoint | undefined,
    reverse: boolean,
  ): ChartPoint => {
    const p = previous ?? current;
    const n = next ?? current;
    const angle = Math.atan2(n.y - p.y, n.x - p.x) + (reverse ? Math.PI : 0);
    const length = Math.hypot(n.x - p.x, n.y - p.y) * smoothing;
    return {
      x: current.x + Math.cos(angle) * length,
      y: current.y + Math.sin(angle) * length,
    };
  };

  const fixed = (n: number): string => n.toFixed(2);

  let line = `M ${fixed(points[0].x)} ${fixed(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    const start = controlPoint(points[i - 1], points[i - 2], points[i], false);
    const end = controlPoint(points[i], points[i - 1], points[i + 1], true);
    line += ` C ${fixed(start.x)} ${fixed(start.y)}, ${fixed(end.x)} ${fixed(end.y)}, ${fixed(points[i].x)} ${fixed(points[i].y)}`;
  }

  const last = points[points.length - 1];
  const area = `${line} L ${fixed(last.x)} ${fixed(height)} L ${fixed(points[0].x)} ${fixed(height)} Z`;

  return { line, area, points, yFor };
}
