"use client";

import React from "react";
import {
  AppBar as _AppBar,
  Avatar,
  Button,
  Divider,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@repo/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const APP_BAR_HEIGHT = 56;

export default function AppBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const signin = () => {
    window.open("/auth/signin/popup");
  };

  const handleOnClickSignIn = () => {
    signin();
  };

  const handleOnClickLogo = () => {
    router.replace("/");
  };

  const handleOnClickAvatar = async () => {
    router.push("/my");
  };

  const trigger = useScrollTrigger();

  return (
    <_AppBar position="fixed">
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          flex={1}
          onClick={handleOnClickLogo}
        >
          <Image
            src="/assets/images/logo/84x84.png"
            width={42}
            height={42}
            alt="logo"
            style={{ display: "none" }}
          />
          {/* <CountrySelect disabled /> */}
        </Stack>
        {status === "authenticated" ? (
          <Avatar
            sx={{ width: 24, height: 24 }}
            alt={session?.user?.name || ""}
            // src={session?.user?.profileImageUrl}
            onClick={handleOnClickAvatar}
          />
        ) : (
          <Button variant="text" color="inherit" onClick={handleOnClickSignIn}>
            로그인
          </Button>
        )}
      </Toolbar>
      {trigger && <Divider />}
    </_AppBar>
  );
}
