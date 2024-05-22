import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock";

import TicketIcon from "../../assets/ticket-icon.png";

import { authenticate, queryClient } from "../../util/http";
import { getRole } from "../../util/auth";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const navigate = useNavigate();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: authenticate,
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets", "users"]);

      const role = getRole();

      if (role === "admin") {
        navigate("/admin/tickets");
      }

      if (role === "user") {
        navigate("/submit-ticket");
      }
    },
  });

  const location = useLocation();
  const pathName = location.pathname;

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const authFormSubmitHandler = (event) => {
    event.preventDefault();

    if (username.trim().length === 0 || password.trim().length === 0) {
      setIsFormInvalid(true);
      return;
    }

    const user = {
      username: username.toLowerCase(),
      password: password.toLowerCase(),
    };

    mutate({ pathName, user });
  };

  const isLogin = pathName === "/login";
  const isUsernameInvalid = username.trim().length === 0 && isFormInvalid;
  const isPasswordInvalid = password.trim().length === 0 && isFormInvalid;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-2">
      <form
        onSubmit={authFormSubmitHandler}
        className="bg-blueishWhite flex flex-col justify-center py-20 px-8 rounded-3xl shadow-lg xl:w-1/5"
      >
        <img src={TicketIcon} className="w-32 mx-auto mb-8" />
        {isError && <ErrorBlock>{error.info.message}</ErrorBlock>}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={usernameChangeHandler}
              className={`p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:bg-white focus:border-blue-200 transition ${
                isUsernameInvalid ? "border-red-500 bg-red-300 " : ""
              }`}
            />
            {isUsernameInvalid && (
              <p className="text-red-500 text-xs -mt-1 ml-1">Invalid input</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={passwordChangeHandler}
              className={`p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:bg-white focus:border-blue-200 transition ${
                isPasswordInvalid ? "border-red-500 bg-red-300 " : ""
              }`}
            />
            {isPasswordInvalid && (
              <p className="text-red-500 text-xs -mt-1 ml-1">Invalid input</p>
            )}
          </div>
        </div>
        <button
          disabled={isPending}
          className="bg-darkBlue text-white font-bold rounded-full py-2 shadow-md disabled:cursor-not-allowed disabled:bg-slate-600"
        >
          {isLogin && !isPending && "Login"}
          {isLogin && isPending && "Logging in..."}
          {!isLogin && !isPending &&"Sign up"}
          {!isLogin && isPending && "Signing up..."}
        </button>
        <p className="mt-12 -mb-16 text-sm mx-auto text-gray-700">
          {isLogin && "Dont have an account?"}
          {!isLogin && "Have an account?"}
          <Link
            className="text-blue-400 underline"
            to={`${isLogin ? "/signup" : "/login"}`}
          >
            {isLogin && "Sign up."}
            {!isLogin && "Login"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
