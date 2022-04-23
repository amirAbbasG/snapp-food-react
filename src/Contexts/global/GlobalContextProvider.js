import React, { useState } from "react";
import { globalContext } from "..";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const GlobalContextProvider = ({ children }) => {
  const { breakpoints } = useTheme();
  const isXl = useMediaQuery(breakpoints.up("xl"));
  const isLg = useMediaQuery(breakpoints.between("lg", "xl"));
  const isMd = useMediaQuery(breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(breakpoints.between("sm", "md"));
  const isXs = useMediaQuery(breakpoints.down("sm"));
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <globalContext.Provider
      value={{
        openAuth,
        setOpenAuth,
        isXl,
        isLg,
        isMd,
        isSm,
        isXs,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
