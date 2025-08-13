"use client";

import { ReactNode, useMemo } from "react";
import { Box, APP_HEADER_HEIGHT } from "@repo/ui";
import { APP_BAR_HEIGHT } from "../components/app-bar";

export interface IDefaultWrapperProps {
  headerType?: "default" | "app";
  header?: ReactNode;
}

export default function DefaultWrapper({
  headerType = "default",
  header,
  children,
}: React.PropsWithChildren<IDefaultWrapperProps>) {
  const headerHeight = useMemo(
    () =>
      header ? (headerType === "app" ? APP_BAR_HEIGHT : APP_HEADER_HEIGHT) : 0,
    [header, headerType],
  );

  return (
    <Box position="relative">
      <Box
        position="fixed"
        display="flex"
        flexDirection="column"
        height="100dvh"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pt="env(safe-area-inset-top)"
        pb="env(safe-area-inset-bottom)"
        overflow="hidden"
      >
        {header && (
          <Box height={headerHeight} sx={{ flex: "0 0 auto" }}>
            {header}
          </Box>
        )}
        <Box
          position="relative"
          height={`calc(100vh - ${headerHeight}px)`}
          sx={{
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
