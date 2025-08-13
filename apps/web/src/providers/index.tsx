"use client";

import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, CustomThemeProvider, GlobalStyles } from "@repo/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={new QueryClient()}>
        <AppRouterCacheProvider>
          <CustomThemeProvider theme={{}}>
            <CssBaseline />
            <GlobalStyles
              styles={(theme) => ({
                body: {
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                },
              })}
            />
            {children}
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
