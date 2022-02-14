import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import {
  InfoOutlined,
  DeliveryDiningTwoTone,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import useStyles from "./styles";
import { setShopDetails } from "../../redux/action/shopsActions";
import {
  FoodCard,
  RateBox,
  ShopInformationDialog,
  FoodDetailsDialog,
  CouponBox,
  CartBox,
} from "../../components";
import { separatePrice } from "../../utils/priceSeparator";
import { calculateRate } from "../../utils/rateCalculator";
import { isEmpty } from "lodash";
import { shopsContext } from "../../Contexts";

const ShopDetails = () => {
  const [openInformation, setOpenInformation] = useState(false);
  const [openFoodDetails, setOpenFoodDetails] = useState(false);
  const [foodId, setfoodId] = useState(0);
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const shopDetails = useSelector((state) => state.shopDetails);
  const account = useSelector((state) => state.account);
  const cost = separatePrice(shopDetails.deliveryCost);
  const rate = calculateRate(shopDetails.comments);

  let isShopFavorite = false;
  if (!isEmpty(account)) {
    isShopFavorite = account.favoriteShop.some((s) => s._id === shopId);
  }

  const { addShopToFavorite, removeShopFromFavorite } =
    useContext(shopsContext);

  const handlePressFavorite = () => {
    if (isShopFavorite) {
      removeShopFromFavorite(shopId);
    } else {
      addShopToFavorite(shopId);
    }
  };

  const { foodItem, shopLogo, informationBtn, sideBox } = useStyles();

  const handleClickFood = (foodId) => {
    setfoodId(foodId);
    setOpenFoodDetails(true);
  };

  useEffect(() => {
    dispatch(setShopDetails(shopId));
  }, [shopId, dispatch]);

  return (
    <>
      {shopDetails.foods && (
        <Grid container>
          <Grid container item xs={12} md={4} lg={3} className={sideBox}>
            <Stack direction="row">
              <img
                alt="shop logo"
                className={shopLogo}
                src={`http://192.168.43.209:4000/${shopDetails.shopLogo}`}
              />
              <Stack p={1}>
                <Container>
                  <RateBox rate={rate === 0 ? "جدید" : rate} />
                  <Typography
                    mr={2}
                    color="GrayText"
                  >{`(${shopDetails.comments.length} نظر)`}</Typography>
                </Container>
                <Typography
                  fontSize={17}
                  fontWeight="bold"
                  mt={2}
                >{`${shopDetails.shopName} (${shopDetails.address.city})`}</Typography>
              </Stack>
              <IconButton onClick={handlePressFavorite} sx={{ marginRight: 1 }}>
                <FavoriteBorderOutlined
                  color={isShopFavorite ? "primary" : "#80808"}
                />
              </IconButton>
            </Stack>
            <Button
              onClick={() => setOpenInformation(true)}
              startIcon={<InfoOutlined color="textSecondary" />}
              className={informationBtn}
              color="success"
            >
              اطلاعات و نظرات
            </Button>
          </Grid>
          <Grid container item xs={12} lg={6} md={8} mb={2}>
            <Paper sx={{ borderRadius: 2, overflowY: "scroll", width: "100%" }}>
              <CouponBox coupons={shopDetails.coupons} shopId={shopId} />
              <Typography m={2} textAlign="center">
                منو غذایی
              </Typography>
              <Grid container item width="100%">
                {shopDetails.foods.map((f) => (
                  <Grid
                    key={f._id}
                    item
                    sm={12}
                    xs={12}
                    md={6}
                    p={0.4}
                    className={foodItem}
                  >
                    <FoodCard food={f} onClick={() => handleClickFood(f._id)} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid className={sideBox} container item xs={12} md={12} lg={3}>
            <Paper sx={{ padding: "10px 20px", borderRadius: 2 }}>
              <Container>
                <DeliveryDiningTwoTone />
                <Typography mr={2}>{`پیک فروشنده ${cost} تومان`}</Typography>
              </Container>
            </Paper>
            {!isEmpty(account) && <CartBox shopId={shopId} />}
          </Grid>
          <ShopInformationDialog
            open={openInformation}
            handleClose={() => setOpenInformation(false)}
          />
          {foodId !== 0 && (
            <FoodDetailsDialog
              foodId={foodId}
              open={openFoodDetails}
              handleClose={() => setOpenFoodDetails(false)}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default ShopDetails;