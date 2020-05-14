import lookup from "../index";

export const createFeeback = (callback, data) => {
  lookup("POST", "/feedbacks/create/", callback, data);
};

export default createFeeback;
