import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#F700A2",
    },
    secondary: {
      main: "#F9FAFB",
      dark: "#EBEDF0",
    },
    success: {
      light: "#00B862",
      main: "#228B22",
      dark: "#006400",
    },
    divider: "#808080",

    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#000",
      secondary: "#00B862",

      disabled: "#808080",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
          margin: 3,
          padding: "7px 11px",
        },
        startIcon: {
          marginLeft: 4,
          marginRight: 0,
        },
        endIcon: {
          marginRight: 4,
          marginLeft: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0px !important",
        },
      },
    },
  },

  overrides: {
    MuiButton: {
      text: {
        fontFamily: "IranianSans",
      },
    },

    MuiTypography: {
      root: {
        fontFamily: "IranianSans",
      },
      body1: {
        fontSize: 13,
      },
    },
    MuiTextField: {
      root: {
        fontFamily: "IranianSans",
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: "IranianSans",
      },
    },
    MuiTab: {
      root: {
        fontFamily: "IranianSans",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": "IranianSans",
      },
    },
  },
  shadows: {
    1: " 0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.07)",
    2: " 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.12)",
    3: " 0 3px 6px 0 rgba(0, 0, 0, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.15)",
  },
  typography: {
    fontFamily: "IranianSans",
    body1: {
      fontSize: 13,
    },
    h6: {
      fontWeight: "bold",
      fontSize: 20,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
