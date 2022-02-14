import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderCard } from "../../components";
import useStyles from "./styles";

const UserOrders = () => {
  const classes = useStyles();
  const orders = useSelector((state) => state.orders);
  const deliverdOrders = [...orders].filter((o) => o.isPaid && o.isDelivered);
  return (
    <Stack>
      <Typography m={2} fontWeight="bold">
        سفارش های من
      </Typography>
      {deliverdOrders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </Stack>
  );
};

export default UserOrders;
