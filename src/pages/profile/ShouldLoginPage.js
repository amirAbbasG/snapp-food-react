import React from "react";
import { Stack, Typography } from "@mui/material";
import { InfoTwoTone } from "@mui/icons-material";
import useStyles from "./";
const ShouldLoginPage = () => {
  const classes = useStyles();
  return (
    <Stack alignItems="center" spacing={8}>
      <InfoTwoTone color="primary" sx={{ fontSize: 100 }} />
      <Typography variant="h5" color="textSecondary">
        برای دسترسی به این بخش وارد حساب کاربری خود شوید
      </Typography>
    </Stack>
  );
};

export default ShouldLoginPage;
