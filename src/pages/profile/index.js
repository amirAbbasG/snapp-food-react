import React, { useState } from "react";
import { Typography, Grid, Stack } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditProfileDialog, ChangePasswordDialog } from "../../components";
import useStyles from "./styles";

const Profile = () => {
  const { profileRoot, profileAction, profileDetailBox, detailText } =
    useStyles();
  const account = useSelector((state) => state.account);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const DetailItem = ({ title, value }) => (
    <Stack spacing={2} alignItems="flex-start">
      <Typography className={detailText} color="GrayText">
        {title}
      </Typography>
      <Typography className={detailText} variant="subtitle2" fontWeight="bold">
        {value}
      </Typography>
    </Stack>
  );

  const ProfileAction = ({ title, onClick }) => (
    <Link to="#" onClick={onClick}>
      <Grid className={profileAction}>
        <EditOutlined style={{ color: "#00B862", fontSize: 17 }} />
        <Typography
          fontWeight="bold"
          fontSize={14}
          mr={1}
          color="textSecondary"
        >
          {title}
        </Typography>
      </Grid>
    </Link>
  );

  return (
    <Stack className={profileRoot}>
      <Typography variant="h6">حساب کاربری</Typography>
      <Grid className={profileDetailBox}>
        <DetailItem title="نام نام خانوادگی" value={account.fullName} />
        <DetailItem title="ایمیل" value={account.email} />
      </Grid>
      <ProfileAction
        title="تغییر اطلاعات کاربر"
        onClick={() => setOpenEditProfile(true)}
      />
      <ProfileAction
        title="تغییر رمز عبور"
        onClick={() => setOpenChangePassword(true)}
      />
      <EditProfileDialog
        open={openEditProfile}
        handleClose={() => setOpenEditProfile(false)}
      />
      <ChangePasswordDialog
        open={openChangePassword}
        handleClose={() => setOpenChangePassword(false)}
      />
    </Stack>
  );
};

export default Profile;
