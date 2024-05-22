import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock";
import SuccessBlock from "../UI/SuccessBlock";

import { getUsername } from "../../util/auth";
import { submitTicket, queryClient } from "../../util/http";

const UserDashbord = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const { data, isPending, isError, error, mutate } = useMutation({
    mutationFn: submitTicket,

    onSuccess: () => {
      queryClient.invalidateQueries(["tickets"]);
    },
  });

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitTicktFormHandler = (event) => {
    event.preventDefault();

    if (title.trim().length === 0 || description.trim().length === 0) {
      setIsFormInvalid(true);
      return;
    }

    const username = getUsername();

    const ticket = {
      author: username,
      title,
      description,
      date: new Date(),
    };

    mutate({ ticket });
    setTitle("");
    setDescription("");
    setIsFormInvalid(false);
  };

  const isTitleInvalid = title.trim().length === 0 && isFormInvalid;
  const isDescriptionInvalid = description.trim().length === 0 && isFormInvalid;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-2">
      <form
        onSubmit={submitTicktFormHandler}
        className="bg-blueishWhite flex flex-col py-20 px-8 rounded-3xl shadow-lg mt-20"
      >
        <div className="mb-8">
          <h2 className="text-3xl text-black font-bold mb-2">Ticket Form</h2>
          <p>Please submit your ticket and it will be reviewd ASAP.</p>
        </div>
        {isError && <ErrorBlock>{error.info.message}</ErrorBlock>}
        {data && (
          <SuccessBlock>
            Submitted Successfully! Feel free to submit another ticket
          </SuccessBlock>
        )}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-gray-700">
              Issue Title
            </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={changeTitleHandler}
              className={`p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:bg-white focus:border-blue-200 transition ${
                isTitleInvalid ? "border-red-500 bg-red-300 " : ""
              }`}
            />
            {isTitleInvalid && (
              <p className="text-red-500 text-xs -mt-1 ml-1">Invalid input</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-gray-700">
              Issue Description
            </label>
            <textarea
              id="description"
              autoComplete="off"
              value={description}
              onChange={changeDescriptionHandler}
              className={`p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:bg-white focus:border-blue-200 transition resize-none h-40
               ${isDescriptionInvalid ? "border-red-500 bg-red-300" : ""}`}
            ></textarea>
            {isDescriptionInvalid && (
              <p className="text-red-500 text-xs -mt-1 ml-1">Invalid input</p>
            )}
          </div>
        </div>
        <button
          disabled={isPending}
          className="bg-darkBlue text-white font-bold rounded-full py-2 shadow-md disabled:cursor-not-allowed disabled:bg-slate-600"
        >
          {!isPending && "Submit"}
          {isPending && "Submitting"}
        </button>
      </form>
    </div>
  );
};

export default UserDashbord;
