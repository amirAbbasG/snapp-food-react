import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { getPaymentsApi } from "../../api/orderApi";
import { PaymentCard } from "../../components";
import useStyles from "./styles";

const UserPayments = () => {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const setData = async () => {
      const { status, data } = await getPaymentsApi();
      if (status === 200) {
        setPayments(data.userPayments);
      }
    };
    setData();
  }, []);
  return (
    <Stack>
      <Typography m={2} variant="h6">
        لیست تراکنش‌ها
      </Typography>
      <Typography m={2}>
        در پرداخت‌های ناموفق بانکی اگر مبلغ از حسابتان کسر شود، معمولاً در کمتر
        از یک ساعت و نهایتاً تا ۷۲ ساعت به حساب شما برگردانده خواهد شد.
      </Typography>
      {payments.map((payment) => (
        <PaymentCard key={payment._id} payment={payment} />
      ))}
    </Stack>
  );
};

export default UserPayments;
