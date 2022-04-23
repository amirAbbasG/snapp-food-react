import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({
  showShopTypes = true,
  children,
  useDefaultOutlet = true,
}) => {
  const { breakpoints } = useTheme();
  return (
    <>
      <Header showShopTypes={showShopTypes} />
      <Grid
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            maxWidth: "85.4rem",
            padding: "2.5rem",
            width: "100%",
            [breakpoints.down("sm")]: {
              padding: "1rem",
            },
          }}
        >
          {useDefaultOutlet ? <Outlet /> : children}
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default DefaultLayout;
