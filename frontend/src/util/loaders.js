import { redirect } from "react-router-dom";

import { getAuthToken, getRole } from "./auth.js";

export const adminAuthLoader = () => {
  const token = getAuthToken();
  const role = getRole();

  if (!token || role !== "admin") {
    return redirect("/login");
  }

  return null;
};

export const userAuthLoader = () => {
  const token = getAuthToken();
  const role = getRole();

  if (!token || role !== "user") {
    return redirect("/login");
  }

  return null;
};

export const authLoader = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("time");

  return null;
};
