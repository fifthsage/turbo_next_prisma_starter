/* eslint-disable import/named */
"use client";

import React from "react";
import { Close } from "@mui/icons-material";
import {
  AppBar,
  AppBarOwnProps,
  AppBarProps,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useRouter } from "next/navigation";

export const APP_HEADER_HEIGHT = 56 as const;

interface AppHeaderProps {
  title: string;
  backPath?: string;
  backPathConfirmMessage?: string;
  scrollTarget?: Node;
  fixDivider?: boolean;
  height?: number;
  onClose?: () => void;
}

export default function AppHeader({
  title,
  position,
  elevation = 0,
  fixDivider = false,
  height = APP_HEADER_HEIGHT,
  scrollTarget,
  backPathConfirmMessage,
  backPath,
  onClose,
}: AppHeaderProps &
  Pick<AppBarOwnProps, "position"> &
  Pick<AppBarProps, "elevation">) {
  const router = useRouter();

  const handleOnClickBack = () => {
    if (backPathConfirmMessage && !confirm(backPathConfirmMessage)) {
      return;
    }

    if (onClose) {
      return onClose();
    }

    if (backPath) {
      switch (backPath) {
        case "_blank": {
          return window.close();
        }
        default: {
          return router.replace(backPath);
        }
      }
    }

    return router.back();
  };

  const trigger = useScrollTrigger({
    target: scrollTarget,
  });

  const renderDivider = () => {
    if (fixDivider) {
      return <Divider />;
    }

    if (trigger) {
      return <Divider />;
    }

    return null;
  };

  return (
    <AppBar position={position} color="inherit" elevation={elevation}>
      <Toolbar sx={{ height }}>
        <Typography
          variant="body1"
          color="inherit"
          component="div"
          flexGrow={1}
        >
          {title}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="close"
          onClick={handleOnClickBack}
        >
          <Close />
        </IconButton>
      </Toolbar>
      {renderDivider()}
    </AppBar>
  );
}
