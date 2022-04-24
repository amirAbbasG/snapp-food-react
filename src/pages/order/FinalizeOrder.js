import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Button,
  Typography,
  InputBase,
  CircularProgress,
} from "@mui/material";
import {
  LocationOn,
  LocalOfferOutlined,
  CheckCircle,
} from "@mui/icons-material";
import { Factor, MyHelmet } from "../../components";
import useStyles from "./styles";
import { shopsContext } from "../../Contexts";
import { separatePrice } from "../../utils/priceSeparator";
import { checkPaymentApi } from "../../api/orderApi";
import { errorMessage } from "../../utils/toast";

const FinalizeOrder = () => {
  const { orderId } = useParams();
  const { setDiscount } = useContext(shopsContext);
  const [discountCode, setDiscountCode] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  const orders = useSelector((state) => state.orders);
  const order = orders.find((o) => o._id === orderId);

  let couponDiscount = 0;
  if (order.usedCoupon && order.usedCoupon.discount > 0) {
    couponDiscount = (order.amountByDiscount * order.usedCoupon.discount) / 100;
  }

  //#region payment
  const checkPayment = async () => {
    try {
      setLoadingPayment(true);
      const { data } = await checkPaymentApi(orderId);
      setLoadingPayment(false);
      window.location.replace(data.paymentUrl);
    } catch (error) {
      setLoadingPayment(false);
      errorMessage(error.response.data.message);
    }
  };

  //#endregion

  const { paymentButton, rightBox, foodBox, foodItem, roundedBox } =
    useStyles();

  return (
    <Grid container spacing={2} p={{ xs: 0, sm: 2 }}>
      <MyHelmet
        description="پرداخت انلاین و پرداخت درب منزل برای سفارش غذا"
        title="تایید سفارش"
        keywords="test"
      />
      {order && (
        <>
          <Grid item xs={12} lg={8} p={{ xs: 0, sm: 2 }}>
            <Paper sx={{ width: "100%" }}>
              <Grid className={rightBox}>
                <Typography m={2}>آدرس</Typography>
                <Grid className={roundedBox} mb={14}>
                  <LocationOn style={{ color: "gray" }} />
                  <Typography
                    mr={0.3}
                    my={1}
                    fontSize={{ xs: "11px", sm: "14px" }}
                  >
                    {order.address.exactAddress}
                  </Typography>
                  <Grid flex={1} />
                  <CheckCircle color="success" />
                </Grid>
                <Grid className={roundedBox}>
                  <LocalOfferOutlined />
                  <Typography fontSize={{ xs: "11px", sm: "14px" }} mr={2}>
                    کد تخفیف دارید ؟
                  </Typography>
                  <InputBase
                    sx={{
                      ml: 4,
                      flex: 1,
                      direction: "ltr",
                      fontSize: 20,
                    }}
                    value={discountCode}
                    onChange={(event) => setDiscountCode(event.target.value)}
                  />
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      setDiscount(orderId, discountCode);
                      setDiscountCode("");
                    }}
                    sx={{ left: 0, borderRadius: 3 }}
                  >
                    وارد کردن
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4} p={{ xs: 0, sm: 2 }}>
            <Paper
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                mt={2}
                mr={2}
              >{`سبد خرید (${order.foods.length})`}</Typography>
              <Grid className={foodBox}>
                {order.foods.map((food) => (
                  <Grid key={food._id} className={foodItem}>
                    <Typography
                      my={1}
                    >{`${food.name} (${food.count})`}</Typography>
                    <Typography>
                      {separatePrice(
                        (food.price - (food.price * food.discount) / 100) *
                          food.count
                      )}
                      تومان
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Factor orderId={orderId} couponDiscount={couponDiscount} />
              <Grid p={2}>
                <Button
                  variant="contained"
                  className={paymentButton}
                  onClick={checkPayment}
                >
                  {loadingPayment ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "پرداخت"
                  )}
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default FinalizeOrder;
