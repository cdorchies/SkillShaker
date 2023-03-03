// import User from "../../../contexts/userContext";
// import { useContext } from "react";
import Form from "./form";
import ButtonRegister from "./button-register";
import "../index.scss";

export default function Login() {
  // const { user } = useContext(User);

  return (
    <article id="SkillShaker-Auth">
      <section id="SkillShaker-Form">
        <Form />
        <ButtonRegister />
      </section>
    </article>
  );
}
