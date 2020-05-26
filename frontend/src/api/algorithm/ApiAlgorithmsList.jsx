import lookup from "../index";

export const apiAlgorithmsList = (callback) => {
  const endpoint = `/algorithms/`;
  lookup("GET", endpoint, callback);
};

export default apiAlgorithmsList;
