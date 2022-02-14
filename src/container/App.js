import React from "react";
import { ToastContainer } from "react-toastify";
import MyRoutes from "./MyRoutes";
import {
  GlobalContextProvider,
  ShopsContextProvider,
  AccountContextProvider,
} from "../Contexts";

const App = () => {
  return (
    <>
      <GlobalContextProvider>
        <AccountContextProvider>
          <ShopsContextProvider>
            <MyRoutes />
          </ShopsContextProvider>
        </AccountContextProvider>
      </GlobalContextProvider>
      <ToastContainer />
    </>
  );
};

export default App;
