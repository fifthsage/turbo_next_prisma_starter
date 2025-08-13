"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider, ThemeProviderProps } from "@mui/material";
import { theme } from "@repo/ui";

export default function Providers({
  children,
  ...rest
}: PropsWithChildren<ThemeProviderProps>) {
  return (
    <ThemeProvider {...rest} theme={{ ...theme, ...rest.theme }}>
      {children}
    </ThemeProvider>
  );
}
