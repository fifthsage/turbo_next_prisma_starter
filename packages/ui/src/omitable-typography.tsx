/* eslint-disable import/named */
import React from "react";
import { Typography, TypographyProps } from "@mui/material";

export default function OmitableTypography(props: TypographyProps) {
  return (
    <Typography
      {...props}
      sx={{
        display: "block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        wordBreak: "break-all",
        textAlign: "left",
        ...props.sx,
      }}
    />
  );
}
