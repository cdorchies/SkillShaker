import User from "../../contexts/userContext";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./index.scss";

export default function HomePage() {
  const { user } = useContext(User);

  // useEffect(() => {
  //   if (user !== null) {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
  //       .then(({ data }) => {
  //         if (!data.country || !data.zipcode || !data.city || !data.mobile)
  //           setCompleted(false);
  //       });
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/appfav/${user.id}`)
  //       .then(({ data }) => {
  //         setMyApps(data);
  //       });
  //   }
  // }, []);

  return (
    <article id="SkillShaker-HP">
      {user ? (
        <section>
          <h1>HOMEPAGE</h1>
          <p>This is my homepage</p>
        </section>
      ) : (
        <section className="link-to-connexion">
          <button>
            <NavLink to="/">Me connecter</NavLink>
          </button>
        </section>
      )}{" "}
    </article>
  );
}
