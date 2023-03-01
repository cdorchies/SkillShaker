import { NavLink } from "react-router-dom";

export default function buttonRegister() {
  return (
    <div id="Button-Auth">
      <button>
        <NavLink to="/register">S'inscrire</NavLink>
      </button>
      <NavLink>Mot de passe oublié ?</NavLink>
    </div>
  );
}
