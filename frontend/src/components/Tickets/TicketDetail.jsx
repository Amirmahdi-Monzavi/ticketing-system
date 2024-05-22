import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";

import { fetchTicketById } from "../../util/http";

const TicketDetail = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tickets", { id }],
    queryFn: ({ signal, queryKey }) =>
      fetchTicketById({ signal, ...queryKey[1] }),
  });

  let content;

  if (data) {
    const isoDate = new Date(data.date);

    const year = isoDate.getFullYear();
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const day = isoDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    content = (
      <form className="bg-blueishWhite flex flex-col py-20 px-8 rounded-3xl shadow-lg mt-20">
        <div className="mb-10">
          <h2 className="text-3xl text-black font-bold mb-2">Ticket Detail</h2>
          <p>You can see all of your ticket detail here</p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700">ID</label>
            <input
              type="text"
              readOnly
              className="p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:border-blue-200 transition"
              defaultValue={data.id}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700">Author</label>
            <input
              type="text"
              readOnly
              className="p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:border-blue-200 transition"
              defaultValue={data.author}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700">Issue Title</label>
            <input
              type="text"
              readOnly
              className="p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:border-blue-200 transition"
              defaultValue={data.title}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700">Issue Description</label>
            <textarea
              readOnly
              className="p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:border-blue-200 transition resize-none h-40"
              defaultValue={data.description}
            ></textarea>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700">Date</label>
            <input
              type="text"
              readOnly
              className="p-2 rounded-xl border-2 focus:outline-none focus:border-2 focus:border-blue-200 transition"
              defaultValue={formattedDate}
            />
          </div>
        </div>
      </form>
    );
  }

  if (isError) {
    content = (
      <div className="flex flex-col justify-center items-center">
        <ErrorBlock>{error.info.message}</ErrorBlock>
        <Link
          to="/admin/tickets"
          className="underline underline-offset-2 block mt-2"
        >
          Back to admin page
        </Link>
      </div>
    );
  }

  if (isPending) {
    content = <LoadingIndicator />;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-2">
      {content}
    </div>
  );
};

export default TicketDetail;
