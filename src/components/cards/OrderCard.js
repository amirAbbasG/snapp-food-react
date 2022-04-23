import React, { useState } from "react";
import { Badge, Button, Stack, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { InfoOutlined, Autorenew, LocationOn } from "@mui/icons-material";
import { DateTimeBox } from "../";
import { separatePrice } from "../../utils/priceSeparator";
import { useDispatch } from "react-redux";
import { FactorDialog } from "../";
import { reOrder } from "../../redux/action/orderActions";

const OrderCard = ({ order }) => {
  const { root, shopImage, foodBox, badge, exactAddress } = useStyles();
  const dispatch = useDispatch();
  const [openFactor, setOpenFactor] = useState(false);

  return (
    <>
      <Stack spacing={2} className={root}>
        <Stack spacing={3}>
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
              <Container>
                <LocationOn style={{ color: "gray" }} />
                <Typography mr={0.3} className={exactAddress}>
                  {order.address.exactAddress}
                </Typography>
              </Container>
            </Stack>
          </Container>
          <Stack pr={2} direction={{ xs: "column", sm: "row" }}>
            {order.foods.map((food) => (
              <Badge
                className={badge}
                color="primary"
                badgeContent={food.count}
                key={food._id}
              >
                <Stack className={foodBox}>
                  <Typography>{food.name}</Typography>
                </Stack>
              </Badge>
            ))}
          </Stack>
        </Stack>
        <Stack spacing={3} alignItems={{ xs: "center", lg: "flex-end" }}>
          <Typography>
            {separatePrice(order.amountByDiscount + order.shopId.deliveryCost)}{" "}
            تومان
          </Typography>
          <Container>
            <Button
              onClick={() => setOpenFactor(true)}
              color="secondary"
              variant="contained"
              startIcon={<InfoOutlined />}
            >
              مشاهده فاکتور
            </Button>
            <Button
              onClick={() => dispatch(reOrder(order._id))}
              color="primary"
              variant="contained"
              startIcon={<Autorenew />}
            >
              سفارش مجدد
            </Button>
          </Container>
        </Stack>
      </Stack>
      <FactorDialog
        open={openFactor}
        orderId={order._id}
        handleClose={() => setOpenFactor(false)}
      />
    </>
  );
};

export default OrderCard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "felx",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px #e3e3e4 solid",
    padding: 14,
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  shopImage: {
    width: "3.7rem",
    height: "3.7rem",
    borderRadius: 7,
    marginLeft: 7,
    boxShadow: theme.shadows[1],
  },
  foodBox: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 10,
    padding: 4,
  },
  badge: {
    marginLeft: "12px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  exactAddress: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "20ch",
    whiteSpace: "noWrap",
  },
}));
