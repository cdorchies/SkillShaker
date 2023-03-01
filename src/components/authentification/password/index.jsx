import Form from "./form";
import ButtonLogin from '../register/button-login'
import "../index.scss";

export default function passwordForgotten() {
  return (
    <article id="SkillShaker-Auth">
      <section id="SkillShaker-Form">
        <Form />
        <ButtonLogin/>
      </section>
    </article>
  );
}
