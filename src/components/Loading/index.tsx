import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Loading = () => {
  const { isLoading } = useAuth();

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>Carregando...</span>
      </div>
    );

  return <Outlet />;
};

export default Loading;
