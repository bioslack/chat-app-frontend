import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = function () {
  const { setAccessToken } = useAuth();
  const refresh = async function () {
    const response = await axios.get("auth/refresh", {
      withCredentials: true,
    });

    setAccessToken(response.data.access);

    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
