import React from "react";
import { makeStyles } from "@mui/styles";
import Mapir from "mapir-react-component";
import { Button, Grid, Typography } from "@mui/material";
import { MyDialog, MyForm } from "../";

const AddressDialog = ({ open, handleClose }) => {
  const Map = Mapir.setToken({
    transformRequest: (url) => {
      return {
        url: url,
        headers: {
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3YjI1MjYyZWQ3NjkzOGIzMTBiMThhYTM4MjczZTMwMmM0MDNiMDQ1ZjljMWE3NTY5ZjhiNWZiODlhNGZkMmQ1OWZhNGI0NzRkZDhmNWNkIn0.eyJhdWQiOiIxNjkxMyIsImp0aSI6ImU3YjI1MjYyZWQ3NjkzOGIzMTBiMThhYTM4MjczZTMwMmM0MDNiMDQ1ZjljMWE3NTY5ZjhiNWZiODlhNGZkMmQ1OWZhNGI0NzRkZDhmNWNkIiwiaWF0IjoxNjQzODc3NTc1LCJuYmYiOjE2NDM4Nzc1NzUsImV4cCI6MTY0NjM4MzE3NSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.nqdlEGvvrtkZzK686ORubLATICjegEc8WQ9SaElgPiHXQci8nl_doeOFajUzgjSucblNT3TXwdn7FDt0dlIeaD5WVKxAKe0yVKsAbbucuiYTnFVARGc7osMT0zD2W2sd_9Q5OBEH3eIZ-eTlGGxqsDLurFp9dQY3tirSlww163Zw9hrPWgYNxp21A9nzjACIV1NJRflDWP1_3Bu8-tLEzIRtGXpJgPuOJoVsGWnSuTdYvSwQG-Z_014rhdp7s_cixBRS_BaHqXPuhTYtZU4lwrqI6br4R4EPrd8utK6r7N_mGfKkxZ2Yq873wSJ3b-FK9m-s8d7ELZgfoauE1lAAYg",
          "Mapir-SDK": "reactjs",
        },
      };
    },
  });
  return (
    <MyDialog open={open} onClose={handleClose} title="آدرس جدید" width="80%">
      <div>
        <Mapir center={[51.42047, 35.729054]} Map={Map}>
          <Mapir.Marker coordinates={[51.41, 35.72]} anchor="bottom" />
        </Mapir>
      </div>
    </MyDialog>
  );
};

export default AddressDialog;

const useStyles = makeStyles({
  priceItem: {
    justifyContent: "space-between",
    padding: "7px !important",
  },
});
