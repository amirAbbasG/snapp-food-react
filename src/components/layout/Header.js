import React, { useState, useContext } from "react";
import { Grid, Paper, Button, Typography, IconButton } from "@mui/material";
import {
  AddBusiness,
  Search,
  MyLocation,
  ArrowDropDown,
  PersonOutline,
  ListAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";
import {
  ShopTypesBox,
  SnappFoodLogo,
  SearchDialog,
  AuthDialog,
  ProfileMenu,
  AddressButton,
  AddressDialog,
  OrdersDrawer,
} from "../";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { globalContext } from "../../Contexts";

const Header = ({ showShopTypes }) => {
  const account = useSelector((state) => state.account);
  const isLogin = !isEmpty(account);

  console.log({ account });

  const styles = useStyles(isLogin)();

  const [openSearch, setOpenSearch] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const { isSm, isXs, openAuth, setOpenAuth } = useContext(globalContext);

  const HeaderButton = styled(Button)((theme) => ({
    height: "3rem",
    marginRight: "2px",
    [theme.breakpoints.up("xl")]: {
      fontSize: "14px",
    },
  }));

  //#region handlers

  const handleAuth = (event) => {
    if (isLogin) {
      setProfileAnchorEl(event.currentTarget);
    } else {
      setOpenAuth(true);
    }
  };

  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const handleOpenAddress = () => {
    setOpenAddress(true);
  };

  //#endregion

  const SearchBox = () => (
    <Grid
      onClick={() => setOpenSearch(true)}
      item
      md={3}
      className={styles.SearchBox}
    >
      <Search color="disabled" fontSize="medium" />
      <Typography className={styles.searchText}>جستجو در اسنپ فود</Typography>
    </Grid>
  );

  const Dialogs = () => (
    <>
      <SearchDialog
        open={openSearch}
        handleClose={() => setOpenSearch(false)}
      />
      <AuthDialog open={openAuth} handleClose={() => setOpenAuth(false)} />
      <AddressDialog
        open={openAddress}
        handleClose={() => setOpenAddress(false)}
      />
      <OrdersDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />
      <ProfileMenu
        anchorEl={profileAnchorEl}
        onClose={() => setProfileAnchorEl(null)}
      />
    </>
  );

  const SearchAndAuthButtons = () => (
    <Grid
      className={styles.iconsBox}
      item
      xs={isLogin ? 6 : 5}
      sm={5}
      md={2}
      lg={3}
    >
      <IconButton
        onClick={() => setOpenSearch(true)}
        className={styles.searchIcon}
      >
        <Search color="disabled" sx={{ fontSize: 30 }} />
      </IconButton>

      <IconButton onClick={handleAuth}>
        <PersonOutline sx={{ fontSize: 30 }} />
      </IconButton>
    </Grid>
  );

  return (
    <>
      <Paper className={styles.root} component="header">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          pt="0.7rem"
        >
          <Grid item sm={1}>
            <SnappFoodLogo className={styles.logo} />
          </Grid>

          {isLogin ? (
            <>
              <Grid item xs={3} sm={4} container className={styles.addressBox}>
                <Grid item ml={2}>
                  <MyLocation sx={{ color: "#808080" }} />
                </Grid>
                <Grid item>
                  <Link to="#" onClick={handleOpenAddress}>
                    <Typography
                      lineHeight={0.7}
                      className={styles.addressTitle}
                    >
                      آدرس انتخابی
                    </Typography>
                    <Typography
                      color="GrayText"
                      fontSize={10}
                      className={styles.exactAddress}
                    >
                      {!isEmpty(account.addresses)
                        ? [...account.addresses].reverse()[0].exactAddress
                        : "آدرسی ثبت نشده"}
                      {<ArrowDropDown color="primary" />}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>

              <SearchBox />
              <SearchAndAuthButtons />

              <Grid
                className={styles.orderBox}
                item
                xs={2}
                sm={1}
                md={1.3}
                lg={1}
              >
                <HeaderButton
                  onClick={() => setOpenDrawer(true)}
                  variant="text"
                  sx={{ color: "#000", px: 0, mr: "4px" }}
                  startIcon={<ListAlt sx={{ fontSize: 30 }} />}
                >
                  {!isSm && !isXs && "سفارش ها"}
                </HeaderButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={7} sm={4} className={styles.addressButton}>
                <Link to="#" onClick={handleCloseAddress}>
                  <AddressButton />
                </Link>
              </Grid>
              <SearchBox />

              <Grid item md={4} className={styles.buttonBox}>
                <HeaderButton
                  variant="text"
                  sx={{ color: "#000" }}
                  startIcon={<AddBusiness sx={{ fontSize: "30px" }} />}
                >
                  ثبت نام فروشندگان
                </HeaderButton>
                <HeaderButton
                  onClick={() => setOpenAuth(true)}
                  variant="contained"
                >
                  ورود یا عضویت
                </HeaderButton>
              </Grid>

              <SearchAndAuthButtons />
            </>
          )}
        </Grid>

        {showShopTypes && <ShopTypesBox />}
      </Paper>
      <Dialogs />
    </>
  );
};

export default Header;

const useStyles = (isLogin) =>
  makeStyles((theme) => ({
    root: {
      padding: "0 1rem 1rem 1rem",
      width: "100%",
      position: "sticky",
      zIndex: 999,
      top: "0px",
      right: "0px",
      left: "0px",
    },
    logo: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    SearchBox: {
      backgroundColor: theme.palette.secondary.dark,
      borderRadius: "8px",
      alignItems: "center",
      display: "flex",
      width: "27%",
      padding: "10px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    searchText: {
      display: "inline",
      color: "#808080",
      fontSize: "15px",
      marginRight: "8px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "13px",
      },
    },
    buttonBox: {
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    addressBox: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    iconsBox: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        display: !isLogin && "none",
      },
    },
    orderBox: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    addressButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    addressTitle: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
      },
    },
    exactAddress: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "20ch",
    },
    searchIcon: {
      marginLeft: "4px",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));
