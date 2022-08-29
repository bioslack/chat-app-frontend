import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import useRefreshToken from "./hooks/useRefreshToken";
import Router from "./routes";
import "./sass/main.scss";

function App() {
  const { accessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    refresh().catch(() => {});
  }, [accessToken, refresh]);

  return <Router />;
}

export default App;
