import lookup from "../index";

export const apiLogin = (user, callback) => {
  lookup("POST", "/login/", callback, {username: user.username, password: user.password});
};

export default apiLogin;
