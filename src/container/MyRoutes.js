import React, { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { DefaultLayout, ProfileLayout } from "../components";

const MyRoutes = () => {
  //#region page imports
  const Main = lazy(() => import("../pages/main"));
  const Shops = lazy(() => import("../pages/shop"));
  const ShopDetails = lazy(() => import("../pages/shop/ShopDetails"));
  const Profile = lazy(() => import("../pages/profile"));
  const UserPayments = lazy(() => import("../pages/profile/UserPayments"));
  const UserOrders = lazy(() => import("../pages/profile/UserOrders"));
  const FavoriteShops = lazy(() => import("../pages/shop/FavoriteShops"));
  const FinalizeOrder = lazy(() => import("../pages/order/FinalizeOrder"));
  //#endregion

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Main />} />
          <Route path="shops" element={<Shops />}>
            <Route path=":filter" element={<Shops />} />
          </Route>
          <Route path="shopDetails/:shopId" element={<ShopDetails />} />
          <Route path="finalizeOrder/:orderId" element={<FinalizeOrder />} />
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="payments" element={<UserPayments />} />
          <Route path="favoriteShops" element={<FavoriteShops />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MyRoutes;
