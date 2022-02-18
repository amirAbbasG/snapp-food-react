import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { MyHelmet, OrderCard } from "../../components";

const UserOrders = () => {
  const orders = useSelector((state) => state.orders);
  const deliverdOrders = [...orders].filter((o) => o.isPaid && o.isDelivered);
  return (
    <Stack>
      <MyHelmet
        description="سفارش های خود را در حساب کاربری خود مشاهده کنید"
        title="سفارش های شماs"
        keywords="test"
      />
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
