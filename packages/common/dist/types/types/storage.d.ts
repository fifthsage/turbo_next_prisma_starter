export type ChargerEnrichmentGeoKey = [
  domain: string | null,
  category: string | null,
  func: string | null,
  code: string | null,
];

export type ChargerStatusCache = {
  status: "0" | "1" | "2" | "3" | "4" | "5";
  statusUpdatedAt?: string;
  lastStartedAt?: string;
  lastEndedAt?: string;
  nowStartedAt?: string;
  fetchedAt: string;
  source:
    | "app-cache"
    | "redis"
    | "public-api"
    | "redis-stale"
    | "waiting-redis";
};
