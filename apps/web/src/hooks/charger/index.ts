import { CACHE_EXPIRATION, cacheKey, useApi } from "@repo/common";
import {
  Bounds,
  ChargerStatusCache,
  Position,
  WithAggregate,
} from "@repo/common/types";
import { ChargerClusteringResponse, ChargerResponse } from "@repo/database";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { stringify } from "qs";
import { ChargerDetailResponse } from "../../lib/schema";
import { ChargerSearchFilterData } from "../../views/charger/components/charger-search-filter";

export const useChargerClustering = (
  currentPosition: Position | null,
  zoom: number,
  bounds: Bounds | null,
  searchFilterData: ChargerSearchFilterData | null = null,
) => {
  const request = useApi();

  return useQuery({
    queryKey: [
      "charger-clustering",
      zoom,
      JSON.stringify(bounds),
      JSON.stringify(searchFilterData),
    ],
    queryFn: () =>
      request<ChargerClusteringResponse[]>(
        `webapp/charger/clustering?${stringify({ zoom, ...bounds, ...searchFilterData })}`,
      ),
    enabled: !!currentPosition && !!zoom && !!bounds,
  });
};

export const useInfiniteChargersByCluster = (
  zoom: number,
  charger?: ChargerClusteringResponse | null,
) => {
  const request = useApi();
  const take = 10;

  return useInfiniteQuery({
    queryKey: ["infinite-chargers", charger?.gridX, charger?.gridY, zoom],
    queryFn: ({ pageParam }) =>
      request<WithAggregate<ChargerResponse>>(
        `webapp/charger/clustering/by-grid?gridX=${charger?.gridX}&gridY=${charger?.gridY}&zoom=${zoom}&skip=${pageParam * take}&take=${take}`,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return !lastPage?.isLast ? allPages.length : undefined;
    },
    enabled: !!charger,
  });
};

export const useChargers = () => {
  const request = useApi();

  return useQuery({
    queryKey: ["chargers"],
    queryFn: () =>
      request<WithAggregate<ChargerResponse>>(`webapp/charger?&take=100`),
  });
};

export const useCharger = (id?: string | null) => {
  const request = useApi();

  return useQuery({
    queryKey: ["charger", id],
    queryFn: () => request<ChargerResponse>(`webapp/charger/${id}`),
    enabled: !!id,
  });
};

export const useChargerStatus = (
  id?: string | null,
  stationId?: string | null,
  chargerId?: string | null,
) => {
  const request = useApi();
  const tag = cacheKey.next.charger.status(stationId || "", chargerId || "");

  return useQuery({
    queryKey: ["charger-status", stationId, chargerId],
    queryFn: () =>
      request<ChargerStatusCache>(
        `webapp/charger/${id}/status?${stringify({
          stationId,
          chargerId,
        })}`,
        {
          next: {
            tags: [tag],
            revalidate: CACHE_EXPIRATION.NEXT_REVALIDATE,
          },
        },
      ),
    enabled: !!id && !!stationId && !!chargerId,
  });
};

export const useChargerDetail = (id?: string | null) => {
  const request = useApi();

  return useQuery({
    queryKey: ["charger-detail", id],
    queryFn: () =>
      request<ChargerDetailResponse>(`webapp/charger/${id}/detail`),
    enabled: !!id,
  });
};
