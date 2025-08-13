"use client";

import { AppBar } from "../components";
import DefaultWrapper, { IDefaultWrapperProps } from "./default";

export default function WebAppWrapper({
  children,
  ...rest
}: React.PropsWithChildren<IDefaultWrapperProps>) {
  return (
    <DefaultWrapper {...rest} headerType="app" header={<AppBar />}>
      {children}
    </DefaultWrapper>
  );
}
