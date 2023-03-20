import { NavLink } from "react-router-dom";
import Message from "./message";
import "./index.scss";

export default function Header() {
  return (
    <header id="SkillShaker-Header">
      <div className="logo-logged">
        <NavLink to="/">
          <img src="assets/img/logo_skillshaker.png" alt="SkillShaker Logo" />
        </NavLink>
      </div>
      <div className="message">
        <Message />
      </div>
    </header>
  );
}
