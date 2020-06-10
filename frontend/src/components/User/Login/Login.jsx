import React from "react";
import apiLogin from "../../../api/user/ApiLogin";

const Login = (props) => {
  const {setLoginedUser} = props
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = {
      "username": email,
      "password": password
    }
    apiLogin(user, (response, status) => {
      if (status === 201) {
        localStorage.setItem("username", response.username)
        window.location.replace("/profile")
      } else {
        alert("An error occur. Try again.");
      }
    });
    // change this to a server side call
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div class="container">
      <h2>Login</h2>
      <form action="">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            ref={emailRef}
            required={true}
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            ref={passwordRef}
            required={true}
            type="password"
            class="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
          />
        </div>
        <div class="form-group form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember" />
            Remember me
          </label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
