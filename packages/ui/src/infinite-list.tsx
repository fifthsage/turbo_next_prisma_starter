/* eslint-disable no-prototype-builtins */
import React, { ReactNode } from "react";
import { Box, Divider, Stack } from "@mui/material";
import EmptyState from "./empty-state";
import LoadMoreButton from "./load-more-button";
import Spinner from "./spinner";

interface InfiniteListProps<T> {
  isLoading?: boolean;
  keyField?: string | number;
  hasNextPage?: boolean;
  showDivider?: boolean;
  spacing?: number;
  data: T[];
  renderItem: (item: T) => ReactNode;
  onLoadMore?: () => void;
}

export default function InfiniteList<T>({
  isLoading,
  keyField = "",
  hasNextPage,
  showDivider = false,
  spacing = 1,
  data,
  renderItem,
  onLoadMore,
}: InfiniteListProps<T>) {
  const getItemKey = (item: T) => {
    if (typeof item === "object" && item?.hasOwnProperty(keyField)) {
      return (item as T & { [keyField: string]: string | number })[keyField];
    }

    return null;
  };

  if (data.length == 0 && isLoading) {
    return <Spinner />;
  }

  if (data.length == 0) {
    return (
      <Box p={2}>
        <EmptyState />
      </Box>
    );
  }

  return (
    <Stack gap={spacing}>
      {data.map((item, index) => (
        <React.Fragment key={`list-item-${getItemKey(item) || index}`}>
          {showDivider && index > 0 && <Divider />}
          {renderItem(item)}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <LoadMoreButton isLoading={isLoading} onClick={onLoadMore} />
      )}
    </Stack>
  );
}
