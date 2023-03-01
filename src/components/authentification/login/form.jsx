import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    navigate(`/hp`);
  };

  return (
    <>
      <h1>Connexion</h1>

      <form action="" id="Form-Login" onSubmit={handleSubmit}>
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
