import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Menu() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    toast.info(`Déconnexion...`);
    navigate("/");
  };

  console.log(user);

  return (
    <ul className="menuProfile">
      <li>
        <NavLink to="/profile">Mon profil</NavLink>
      </li>
      <li>
        <button type="button" onClick={handleLogOut}>
          Déconnexion
        </button>
      </li>
    </ul>
  );
}
