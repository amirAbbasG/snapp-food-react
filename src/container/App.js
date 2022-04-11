import React from "react";
import { ToastContainer } from "react-toastify";
import MyRoutes from "./MyRoutes";
import {
  GlobalContextProvider,
  ShopsContextProvider,
  AccountContextProvider,
} from "../Contexts";
import { combineProviders } from "../utils/combineProviders";

const App = () => {
  const Providers = combineProviders([
    GlobalContextProvider,
    AccountContextProvider,
    ShopsContextProvider,
  ]);

  return (
    <>
      <Providers>
        <MyRoutes />
      </Providers>
      <ToastContainer />
    </>
  );
};

export default App;
