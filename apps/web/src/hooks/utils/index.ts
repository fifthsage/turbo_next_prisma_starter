"use client";

import { useEffect, useState } from "react";
import { Position } from "@repo/common/types";

export const DEFAULT_POSITION: Position = {
  latitude: 37.5665,
  longitude: 126.9789,
};

export async function getCurrentPosition(): Promise<{
  position: Position;
  isAvailable: boolean;
}> {
  if (!navigator.geolocation) {
    console.warn("Geolocation is not supported");
    return { position: DEFAULT_POSITION, isAvailable: false };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ position: { latitude, longitude }, isAvailable: true });
      },
      (err) => {
        console.warn("Error fetching location", err);
        resolve({ position: DEFAULT_POSITION, isAvailable: false });
      },
    );
  });
}

export default function useCurrentPosition() {
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    getCurrentPosition().then(({ position, isAvailable }) => {
      setPosition(position);
      setIsAvailable(isAvailable);
    });
  }, []);

  return { position, isAvailable };
}
