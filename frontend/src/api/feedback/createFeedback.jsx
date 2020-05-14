import lookup from "../index";

export const createFeeback = (newFeedback, callback) => {
  lookup("POST", "/feedbacks/create/", callback, newFeedback);
};

export default createFeeback;
