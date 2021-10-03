import { LOCAL_VARIABLES } from "../constants/appConfig";

/**
 * Determines whether token exists in local storage
 * - If it does, check time validity as well.
 * @returns Boolean
 */
export const isTokenValid = (): Boolean => {
  const tokenKey = localStorage.getItem(LOCAL_VARIABLES.tokenKey);
  const tokenExpiry = localStorage.getItem(LOCAL_VARIABLES.tokenExpiry);

  if (tokenKey && tokenExpiry) {
    const date = new Date();

    if (Number(tokenExpiry) > date.getTime()) {
      return true;
    } else {
      localStorage.clear();
    }
  }
  return false;
};
