"use client";

import React, { useEffect, useState } from "react";
import {
  Link,
  Container,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@repo/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface ISignInViewProps {
  callbackUrl?: string;
  onClickCancel?: () => void;
  onAuthenticated?: () => void;
}

export default function SignInView({
  callbackUrl,
  onClickCancel,
  onAuthenticated,
}: ISignInViewProps) {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);

  const handleOnClickKakaoLogin = async () => {
    setLoading(true);

    await signIn("kakao", { callbackUrl });
    await updateSession();

    setLoading(false);
  };

  const handleOnClickCancel = () => {
    if (onClickCancel) {
      return onClickCancel();
    }

    return router.replace("/");
  };

  useEffect(() => {
    if (callbackUrl) {
      return;
    }

    if (!session) {
      return;
    }

    // setUser(session.user.id || "");

    if (onAuthenticated) {
      return onAuthenticated();
    }
  }, [callbackUrl, onAuthenticated, router, session]);

  return (
    <Container>
      <Stack gap={3} justifyContent="center">
        <Stack gap={1}>
          <Typography variant="h6" align="center">
            소셜 계정으로 빠르게 시작하기
          </Typography>
          <Typography
            variant="caption"
            align="center"
            color="textSecondary"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {`소셜 계정으로 빠르게 계정을 생성하고,\n전화번호 인증을 생략할 수 있습니다`}
          </Typography>
        </Stack>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <Box onClick={handleOnClickKakaoLogin}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Image
                src={`/assets/images/social-button-kakao.png`}
                alt="카카오톡 로그인"
                width={320}
                height={40}
              />
            )}
          </Box>
          <Link
            fontSize="small"
            color="textSecondary"
            onClick={handleOnClickCancel}
          >
            조금 더 둘러볼게요
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
