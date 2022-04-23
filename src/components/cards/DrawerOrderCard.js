import React from "react";
import { Button, Stack, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Autorenew } from "@mui/icons-material";
import { DateTimeBox } from "../";
import { useDispatch } from "react-redux";
import { reOrder } from "../../redux/action/orderActions";

const DrawerOrderCard = ({ order }) => {
  const { root, shopImage } = useStyles();
  const dispatch = useDispatch();

  return (
    <Stack className={root}>
      <Container>
        <Link to="#">
          <img
            className={shopImage}
            alt="shop-logo"
            src={`http://localhost:4000/${order.shopId.shopLogo}`}
          />
        </Link>
        <Stack spacing={1}>
          <Typography mr={1} fontWeight="bold">
            {order.shopId.shopName}
          </Typography>
          <DateTimeBox dateTime={order.createDate} />
        </Stack>
      </Container>
      <Button
        sx={{ width: "50%" }}
        onClick={() => dispatch(reOrder(order._id))}
        color="secondary"
        variant="contained"
        startIcon={<Autorenew />}
      >
        <Typography
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
            fontSize: "12px",
          })}
        >
          سفارش مجدد
        </Typography>
      </Button>
    </Stack>
  );
};

export default DrawerOrderCard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "felx",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px #e3e3e4 solid",
    padding: 10,
  },

  shopImage: {
    width: "3rem",
    height: "3rem",
    borderRadius: 7,
    marginLeft: 7,
    boxShadow: theme.shadows[1],
  },
  button: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      px: "2px",
    },
  },
}));
