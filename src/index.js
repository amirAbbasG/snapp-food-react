import React from "react";
import { render } from "react-dom";
import App from "./container/App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { store } from "./redux/store";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

render(
  <CacheProvider value={muiCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>,

  document.getElementById("root")
);
