import { NavLink } from "react-router-dom";
import "./index.scss";

export default function header() {
  return (
    <header id="SkillShaker-Header">
      <NavLink to="/">
        <img src="assets/img/logo_skillshaker.svg" alt="SkillShaker Logo" />
      </NavLink>
    </header>
  );
}
