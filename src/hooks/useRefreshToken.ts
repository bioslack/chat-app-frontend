import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = function () {
  const { setAccessToken } = useAuth();
  const refresh = async function () {
    const response = await axios.patch(
      "/auth/refresh",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    setAccessToken(response.data.access);

    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
