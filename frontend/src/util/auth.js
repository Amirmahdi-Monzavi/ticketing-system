export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  }

  return null;
};

export const getRole = () => {
  const role = localStorage.getItem("role");

  if (role) {
    return role;
  }

  return null;
};

export const getUsername = () => {
  const username = localStorage.getItem("username");

  if (username) {
    return username;
  }

  return null;
};

export const getTime = () => {
  const presentTime = new Date();
  const authTime = new Date(localStorage.getItem("time"));

  const timer = authTime.getTime() - presentTime.getTime();
  return timer;
};
