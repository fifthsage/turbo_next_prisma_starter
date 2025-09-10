import { Box, Typography } from "@mui/material";

export default function EmptyState() {
  return (
    <Box
      alignItems="center"
      flex={1}
      p={2}
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="caption" color="textSecondary">
        조회 결과가 없습니다.
      </Typography>
    </Box>
  );
}
