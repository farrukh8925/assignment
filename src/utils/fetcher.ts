import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_ROUTES } from "../constants/apiConfig";
import { LOCAL_VARIABLES } from "../constants/appConfig";

const instance: AxiosInstance = axios.create({
  baseURL: API_ROUTES.baseUrl,
  timeout: 2000,
});

/**
 * Export the register method
 * we will store the retrieved token in local storage
 */
export const register = async (name: string, email: string) => {
  const params = new URLSearchParams();
  params.append("client_id", process.env.REACT_APP_CLIENT_ID || "");
  params.append("email", email);
  params.append("name", name);

  try {
    const response = await instance.post(API_ROUTES.register, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // Check the response for the token
    if (response.data) {
      const { data } = response.data as any;
      const { sl_token } = data;
      const myDate = new Date();

      localStorage.setItem(LOCAL_VARIABLES.tokenKey, sl_token);
      localStorage.setItem(
        LOCAL_VARIABLES.tokenExpiry,
        myDate.setHours(myDate.getHours() + 1).toString()
      );

      return Promise.resolve();
    }
  } catch (error) {
    return Promise.reject();
  }
};

/**
 * Getter method
 */
export const get = async (
  url: string,
  params: Record<string, any>
): Promise<AxiosResponse<never>> => {
  try {
    return await instance.get(url, {
      params: {
        ...params,
        sl_token: localStorage.getItem(LOCAL_VARIABLES.tokenKey),
      },
    });
  } catch (error) {
    return Promise.reject();
  }
};
