import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Form from "./form";
import "./index.scss";

// CONTEXT
import User from "../../../contexts/userContext";

export default function Profile() {
  const [infos, setInfos] = useState([]);
  const { user } = useContext(User);
  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/info`, {
          headers: {
            Authorization: "Bearer " + user.token, //the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          setInfos(data);
        });
    }
  }, []);

  return (
    <article id="SkillShaker-Profile">
      <section className="profile">
        <div className="redirection">
          <NavLink to="/hp">Retour</NavLink>
        </div>
        <h1 className={infos.isVerified === true ? "verified" : "not-verified"}>
          Mon profil
        </h1>
        <Form />
      </section>
    </article>
  );
}
