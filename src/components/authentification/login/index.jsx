// import User from "../../../contexts/userContext";
// import { useContext } from "react";
import Cookies from "js-cookie";
import Form from "./form";
import ButtonRegister from "./button-register";
import "../index.scss";

export default function Login() {
  // const { user } = useContext(User);
  const authToken = Cookies.get("auth_token");
  if (authToken) {
    window.location.href = "/hp";
  } else {
    return (
      <article id="SkillShaker-Auth">
        <section id="SkillShaker-Form">
          <Form />
          <ButtonRegister />
        </section>
      </article>
    );
  }
}
