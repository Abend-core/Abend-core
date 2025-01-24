export const storeSessionData = (token, id) => {
  sessionStorage.setItem("authToken", token);
  sessionStorage.setItem("id", id);
};

export const getSessionData = () => {
  return {
    token: sessionStorage.getItem("authToken"),
    id: sessionStorage.getItem("id"),
  };
};

export const clearSessionData = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("isAdmin");
};
