import React from "react";
import { Drawer, Typography, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Restore } from "@mui/icons-material";
import { DrawerOrderCard } from "../";
import { makeStyles } from "@mui/styles";

const OrdersDrawer = ({ open, handleClose }) => {
  const { drawer, ordersBox } = useStyles();
  const orders = useSelector((state) => state.orders);
  const deliverdOrders = [...orders].filter((o) => o.isPaid && o.isDelivered);
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      classes={{
        paper: drawer,
      }}
      SlideProps={{ direction: "right" }}
    >
      <Typography m={2} fontWeight="bold">
        سفارش های پیشین
      </Typography>
      <Stack className={ordersBox}>
        {deliverdOrders.map((order) => (
          <DrawerOrderCard key={order._id} order={order} />
        ))}
      </Stack>
      <Button startIcon={<Restore color="success" />} color="success">
        مشاهده همه سفارش ها
      </Button>
    </Drawer>
  );
};

export default OrdersDrawer;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "30%",
    [theme.breakpoints.down("xl")]: {
      width: "38%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      width: "67%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "94%",
    },
  },
  ordersBox: {
    margin: 10,
    borderRadius: 10,
    border: "1px #e3e3e4 solid",
  },
}));
