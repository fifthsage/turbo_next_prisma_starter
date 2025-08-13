export const zoomResolutionMap: Record<number, number> = {
  6: 1.0, // 100km
  7: 0.5, // 50km
  8: 0.25, // 25km
  9: 0.15, // 15km
  10: 0.1, // 10km
  11: 0.05, // 5km
  12: 0.025, // 2.5km
  13: 0.01, // 1km
  14: 0.005, // 500m
  15: 0.0025, // 250m
  16: 0.001, // 100m
  17: 0.0005, // 50m
  18: 0.00025, // 25m
  19: 0.0001, // 10m
  20: 0.00005, // 5m
  21: 0.000025, // 2.5m
};

export function getResolution(zoom: number): number {
  const parsedZoom = zoom;
  const fallback = 1 / Math.pow(2, parsedZoom - 1);
  return zoomResolutionMap[parsedZoom] ?? Math.max(0.00005, fallback);
}
