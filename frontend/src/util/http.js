import { QueryClient } from "@tanstack/react-query";

import { getAuthToken } from "../util/auth";

export const queryClient = new QueryClient();

export const fetchUsersLength = async ({ signal }) => {
  const response = await fetch("http://localhost:3000/users-length", {
    signal,
  });

  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    error.message = await response.json().message;

    throw error;
  }

  const { data } = await response.json();
  return data.usersLength;
};

export const fetchTickets = async ({ signal }) => {
  const response = await fetch("http://localhost:3000/admin/tickets", {
    signal,
  });

  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    error.message = await response.json().message;

    throw error;
  }

  const { data } = await response.json();
  return data;
};

export const fetchTicketById = async ({ signal, id }) => {
  const response = await fetch(`http://localhost:3000/admin/tickets/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("Faild to fecth the ticket");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  const { data } = await response.json();

  return data[0];
};

export const authenticate = async ({ pathName, user }) => {
  let url = "http://localhost:3000/login";

  if (pathName === "/signup") {
    url = "http://localhost:3000/signup";
  }

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Failed to authenticate");

    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  const { data } = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role);

  console.log(data);

  const date = new Date();
  date.setHours(date.getHours() + 1);
  localStorage.setItem("time", date);

  return data;
};

export const submitTicket = async ({ ticket }) => {
  const token = getAuthToken();

  const response = await fetch("http://localhost:3000/submit-ticket", {
    method: "POST",
    body: JSON.stringify(ticket),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    const error = new Error("Failed to submit the ticket");

    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  const { data } = await response.json();
  return data;
};
