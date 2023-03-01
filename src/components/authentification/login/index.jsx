import Form from "./form";
import ButtonsLogin from "./button-register";
import "../index.scss";

export default function login() {
  return (
    <article id="SkillShaker-Auth">
      <section id="SkillShaker-Form">
        <Form />
        <ButtonsLogin />
      </section>
    </article>
  );
}
