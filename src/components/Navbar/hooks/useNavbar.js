import { useNavigate } from "react-router-dom";
import useDecodeToken from "../../../hooks/useDecodeToken";

function useNavbar() {
  const { decodedToken } = useDecodeToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return {
    decodedToken,
    handleLogout,
  };
}

export default useNavbar;
