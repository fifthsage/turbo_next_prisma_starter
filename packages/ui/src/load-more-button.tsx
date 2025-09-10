import { Box, Button } from "@mui/material";
import Spinner from "./spinner";

interface LoadMoreButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
}

export default function LoadMoreButton({
  isLoading,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <Box
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="textSecondary"
      p={2}
    >
      {isLoading ? <Spinner /> : <Button color="inherit">더 불러오기</Button>}
    </Box>
  );
}
