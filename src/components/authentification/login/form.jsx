export default function loginForm() {
  return (
    <>
      <h1>Connexion</h1>

      <form action="" id="Form-Login">
        <div>
          <label htmlFor="email">
            Email
            <input type="text" name="email" />
          </label>
        </div>
        <div>
          <label htmlFor="mdp">
            Mot de Passe
            <input type="password" name="mdp" />
          </label>
        </div>
        <div>
          <input type="submit" value="Connexion" />
        </div>
      </form>
    </>
  );
}
