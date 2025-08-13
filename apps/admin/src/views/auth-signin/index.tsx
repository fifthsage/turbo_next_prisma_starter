"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getErrorMessage } from "@repo/common";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  FormHelperText,
  IconButton,
  Box,
} from "@repo/ui";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SignInInput from "../../lib/dto/signin-input";
import { signinInputSchema } from "../../lib/schemas";

export default function SignInView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { isValid: isValid, errors },
    control,
    getValues,
    watch,
    trigger,
  } = useForm<SignInInput>({
    resolver: zodResolver(signinInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handelOnSubmit = async () => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        ...getValues(),
        redirect: false,
      });

      if (!response?.url) {
        switch (response?.code) {
          case "INVALID_CREDENTIAL": {
            return alert("계정 정보를 확인해 주세요.");
          }
          case "NOT_EXISTS": {
            return alert("계정 정보가 존재하지 않습니다.");
          }
          case "EMPTY_INPUT": {
            return alert("계정 정보를 입력해 주세요.");
          }
          default: {
            return alert("알 수 없는 오류입니다.");
          }
        }
      }

      setLoading(false);
      router.replace("/");
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch(async (_, { name }) => {
      await trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger, getValues]);

  return (
    <Container>
      <Stack gap={3} justifyContent="center">
        <Stack>
          <Typography variant="h5" align="center">
            EV CPO Platform
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center">
            🧑‍💻 ERP
          </Typography>
        </Stack>
        <Stack gap={2}>
          <Stack gap={1}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Stack>
                  <TextField
                    disabled={loading}
                    variant="outlined"
                    placeholder="EMAIL"
                    onChange={onChange}
                    value={value}
                  />
                  {!!errors.email && (
                    <FormHelperText error>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Stack>
                  <TextField
                    disabled={loading}
                    placeholder="PASSWORD"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    onChange={onChange}
                    value={value}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Box color="text.secondary">
                            <IconButton
                              color="inherit"
                              name="visibility-off"
                              onClick={handleOnToggleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Box>
                        ),
                      },
                    }}
                  />
                  {!!errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </Stack>
              )}
            />
          </Stack>
          <Button
            disabled={!isValid || loading}
            variant="contained"
            size="large"
            onClick={handelOnSubmit}
          >
            로그인
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
