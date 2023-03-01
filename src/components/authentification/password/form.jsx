export default function loginForm() {
  return (
    <>
      <h1>Mot de passe oublié ?</h1>
      <form action="" id="Form-Forgotten-Password">
        <div>
          <label htmlFor="email">
            Email
            <input type="text" name="email" />
          </label>
        </div>
        <div>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </>
  );
}
