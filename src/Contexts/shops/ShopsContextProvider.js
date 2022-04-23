import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shopsContext } from "../";
import { getPriceAverage } from "../../utils/rateCalculator";
import {
  addShopToFavoriteApi,
  removeShopFromFavoriteApi,
  addCommentApi,
} from "../../api/shopApi";
import { setDiscountApi, setCouponApi } from "../../api//orderApi";
import { getUserOrders } from "../../redux/action/orderActions";
import { setAccountInformation } from "../../redux/action/accountActions";
import { setShopDetails } from "../../redux/action/shopsActions";
import { errorMessage, successMessage } from "../../utils/toast";

const ShopsContextProvider = ({ children }) => {
  const [couponId, setCouponId] = useState();
  const dispatch = useDispatch();

  const filteredShops = useSelector((state) => state.filteredShops);
  const shopDetails = useSelector((state) => state.shopDetails);
  const account = useSelector((state) => state.account);

  //#region filter shops parameters
  const [priceRange, setPriceRange] = useState({
    title: "همه",
    minPrice: 0,
    maxPrice: 1000000,
  });
  const [isFreeExpress, setIsFreeExpress] = useState(false);
  const [haveCoupon, setHaveCoupon] = useState(false);
  //#endregion

  const filterShops = [...filteredShops].filter((s) =>
    isFreeExpress
      ? s.deliveryCost === 0
      : s.deliveryCost >= 0 && haveCoupon
      ? s.coupons.length > 0
      : s.coupons.length >= 0 &&
        getPriceAverage(s.foods) >= priceRange.minPrice &&
        getPriceAverage(s.foods) < priceRange.maxPrice
  );

  //#region add shop to favorite and remove it
  const addShopToFavorite = async (shopId) => {
    try {
      await addShopToFavoriteApi(shopId);
      dispatch(setAccountInformation());
    } catch (error) {
      errorMessage(error.response.data.message);
    }
  };

  const removeShopFromFavorite = async (shopId) => {
    try {
      await removeShopFromFavoriteApi(shopId);
      dispatch(setAccountInformation());
    } catch (error) {
      errorMessage(error.response.data.message);
    }
  };
  //#endregion

  //#region add comment
  const addComment = async (id, commentBody) => {
    try {
      const { status } = await addCommentApi(id, commentBody);
      if (status === 201) {
        dispatch(setShopDetails(shopDetails._id));
        successMessage("نظر شما ثبت شد");
      }
    } catch (error) {
      errorMessage(error.response.data.message);
    }
  };
  //#endregion

  //#region use discount
  const setDiscount = async (orderId, discountCode) => {
    try {
      // setIsLoadingButton(true);
      const { status } = await setDiscountApi(orderId, discountCode);
      if (status === 200) {
        dispatch(getUserOrders());
      }
      // setIsLoadingButton(false);
      successMessage("تخفیف اعمال شد");
    } catch (error) {
      // setIsLoadingButton(false);
      errorMessage(error.response.data.message);
    }
  };

  //#endregion

  //#region use coupon
  const setCoupon = async (coupon, shopId) => {
    if (coupon.usersUsed && coupon.usersUsed.includes(account._id)) {
      errorMessage("قبلا از این کوپن استفاده کرده اید");
    } else {
      try {
        const { status } = await setCouponApi(shopId, coupon._id);
        if (status === 200) {
          setCouponId(coupon._id);
          dispatch(getUserOrders());
        }
      } catch (error) {
        errorMessage(error.response.data.message);
      }
    }
  };
  //#endregion

  return (
    <shopsContext.Provider
      value={{
        setPriceRange,
        setIsFreeExpress,
        filterShops,
        priceRange,
        isFreeExpress,
        haveCoupon,
        setHaveCoupon,
        addShopToFavorite,
        removeShopFromFavorite,
        addComment,
        setDiscount,
        couponId,
        setCoupon,
      }}
    >
      {children}
    </shopsContext.Provider>
  );
};

export default ShopsContextProvider;
