import lookup from "../index";

export const apiFeedbackCreate = (newFeedback, callback) => {
  lookup("POST", "/feedbacks/create/", callback, {content: newFeedback});
};

export default apiFeedbackCreate;
