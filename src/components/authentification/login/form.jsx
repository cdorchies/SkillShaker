import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../../contexts/userContext";

export default function LoginForm() {
  const { setUser } = useContext(User);
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/login_check`, details)
      // headers???: {
      //   "Access-Control-Allow-Origin" : "*",
      //   "Content-Type": "application/json",
      //   "api-key": "f802b02c05ab327080dc26db34b1545329be5abeb5a63c50a7"
      // }
      .then(({ data }) => {
        setUser(data);
        toast.info(`Vous êtes connecté ${details.email}`);
        console.log(details);
        navigate(`/hp`);
      })
      .catch(() => {
        toast.error(`E-mail ou mot de passe incorrect...`);
        setError("E-mail ou mot de passe incorrect...");
        console.log(details);
      });
  };

  return (
    <>
      <h1>Connexion</h1>

      <form action="" id="Form-Login" onSubmit={handleSubmit}>
        {error !== "" ? <div className="error">{error}</div> : ""}

        <div>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </label>
        </div>
        <div>
          <label htmlFor="mdp">
            Mot de Passe
            <input
              type="password"
              name="mdp"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Connexion" />
        </div>
      </form>
    </>
  );
}
