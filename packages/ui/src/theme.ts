import { createTheme } from "@mui/material";
import { blue, deepPurple, grey } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepPurple[500],
    },
    background: {
      default: grey[100],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        sx: {
          backgroundColor: "Background",
          color: grey[900],
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        sx: {
          mx: 0,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          display: "flex",
          flexWrap: "wrap",
        },
      },
    },
  },
});

export default theme;
