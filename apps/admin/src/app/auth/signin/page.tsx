import React from "react";
import { Box } from "@repo/ui";
import SignInView from "../../../views/auth-signin";
import DefaultWrapper from "../../../wrapper/default";

export default function SignInPage() {
  return (
    <DefaultWrapper>
      <Box
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <SignInView />
      </Box>
    </DefaultWrapper>
  );
}
