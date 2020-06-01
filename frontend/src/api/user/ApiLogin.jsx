import lookup from "../index";

export const apiLogin = (user, callback) => {
  console.log(user)
  lookup("POST", "/login/", callback, {username: user.username, password: user.password});
};

export default apiLogin;
