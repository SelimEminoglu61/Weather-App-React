import "./styleLoginPage.css";

function LoginPage() {
  return (
    <>
      <div className="container">
        <div className="loginDiv">
          <h1>Login</h1>
          <form>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
