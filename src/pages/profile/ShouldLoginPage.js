import React from "react";
import { Stack, Typography } from "@mui/material";
import { InfoTwoTone } from "@mui/icons-material";
import { MyHelmet } from "../../components";

const ShouldLoginPage = () => {
  return (
    <Stack alignItems="center" spacing={8}>
      <MyHelmet
        description="سفارش انواع غذا به سریع ترین زمان ارسال"
        title="وارد شوید"
        keywords="test"
      />
      <InfoTwoTone color="primary" sx={{ fontSize: 100 }} />
      <Typography variant="h5" color="textSecondary">
        برای دسترسی به این بخش وارد حساب کاربری خود شوید
      </Typography>
    </Stack>
  );
};

export default ShouldLoginPage;
