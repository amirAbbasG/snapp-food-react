import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({
  showShopTypes = true,
  children,
  useDefaultOutlet = true,
}) => {
  return (
    <>
      <Header showShopTypes={showShopTypes} />
      <Grid style={{ overflowX: "hidden", overflowY: "scroll" }}>
        <Grid px="4%" py="3rem">
          {useDefaultOutlet ? <Outlet /> : children}
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default DefaultLayout;
