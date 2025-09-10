import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      p={2}
      alignItems="center"
      flex={1}
      justifyContent="center"
      textAlign="center"
    >
      <CircularProgress />
    </Box>
  );
}
