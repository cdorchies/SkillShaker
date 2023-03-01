import { NavLink } from "react-router-dom";

export default function buttonLogin() {
  return (
    <div id="Button-Auth">
      <button>
        <NavLink to="/">Se connecter</NavLink>
      </button>
      <NavLink>Mot de passe oublié ?</NavLink>
    </div>
  );
}
