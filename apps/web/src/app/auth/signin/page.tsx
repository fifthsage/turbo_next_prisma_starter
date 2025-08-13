import React from "react";
import { Box } from "@repo/ui";
import SignInView from "../../../views/auth-signin";
import DefaultWrapper from "../../../wrapper/default";

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { callbackUrl = "/" } = await searchParams;

  return (
    <DefaultWrapper>
      <Box
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <SignInView callbackUrl={callbackUrl as string} />
      </Box>
    </DefaultWrapper>
  );
}
