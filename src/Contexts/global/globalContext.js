import { createContext } from "react";

const globalContext = createContext({
  isXl: false,
  isLg: false,
  isMd: false,
  isSm: false,
  isXs: false,
  openAuth: false,
  setOpenAuth: () => {},
});

export default globalContext;
