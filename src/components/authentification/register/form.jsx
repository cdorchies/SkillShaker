export default function loginForm() {
  return (
    <>
      <h1>Inscription</h1>

      <form action="" id="Form-Auth">
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
          <label htmlFor="username">
            Nom d'utilisateur
            <input type="text" name="username" />
          </label>
        </div>
        <div>
          <input type="submit" value="Inscription" />
        </div>
      </form>
    </>
  );
}
