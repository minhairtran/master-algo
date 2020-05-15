import lookup from "../index";

export const apiFeedbacksList = (username, callback) => {
  if (username) {
    const endpoint = `/feedbacks/?username=${username}`
    lookup("GET", endpoint, callback);
  } else {
    alert("you have to log in to see feedback.");
  }
};

export default apiFeedbacksList;
