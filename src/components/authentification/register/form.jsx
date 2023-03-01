import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    navigate(`/`);
  };

  return (
    <>
      <h1>Inscription</h1>

      <form action="" id="Form-Register" onSubmit={handleSubmit}>
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
          <label htmlFor="username">
            Nom d'utilisateur
            <input
              type="text"
              name="username"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Inscription" />
        </div>
      </form>
    </>
  );
}
