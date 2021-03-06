import Jwt from "jwt-decode";
import { userInformationApi } from "../../api/userApi";

export const setAccount = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = Jwt(token);
    await dispatch({ type: "Set_Account", payload: user });
  };
};
export const setAccountInformation = () => {
  return async (dispatch) => {
    try {
      const { data } = await userInformationApi();
      await dispatch({ type: "Set_Account", payload: data.user });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const clearAccount = () => {
  return async (dispatch) => {
    await dispatch({ type: "Clear_Account" });
  };
};
