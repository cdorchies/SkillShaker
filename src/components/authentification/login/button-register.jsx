import { NavLink } from "react-router-dom";

export default function buttonRegister() {
  return (
    <div id="Button-Auth">
      <button>
        <NavLink to="/register">S'inscrire</NavLink>
      </button>
      <NavLink to="/login/identity/forgotter-password">
        Mot de passe oublié ?
      </NavLink>
    </div>
  );
}
