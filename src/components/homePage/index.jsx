import User from "../../contexts/userContext";
import MessagesList from "./messagesList/messages-list";
import Conversations from "./conversations";
import Tags from "./tags";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./index.scss";

export default function HomePage() {
  const { user } = useContext(User);

  return (
    <article id="SkillShaker-HP">
      {user ? (
        <section className="HP">
          <Conversations />
          <MessagesList />
          <Tags />
        </section>
      ) : (
        <section className="link-to-connexion">
          <button>
            <NavLink to="/">Me connecter</NavLink>
          </button>
        </section>
      )}
    </article>
  );
}
