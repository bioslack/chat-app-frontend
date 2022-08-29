import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PlayGround = function () {
  const refresh = useRefreshToken();
  const { logout } = useAuth();

  const handleRefresh = async function () {
    await refresh();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default PlayGround;
