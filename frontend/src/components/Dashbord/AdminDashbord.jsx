import { useQuery } from "@tanstack/react-query";

import TicketsList from "../Tickets/TicketsList";

import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

import userImg from "../../assets/user-img.png";
import ticketImg from "../../assets/ticket-img.png";

import { fetchUsersLength, fetchTickets } from "../../util/http";

const AdminDashbord = () => {
    const {
    data: usersLength,
    isLoading: isUsersLengthLoading,
    isError: isUsersLengthError,
    error: usersLengthError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => fetchUsersLength({ signal }),
  });

  const {
    data: tickets,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
    error: ticketsError,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: ({ signal }) => fetchTickets({ signal }),
  });

  let totalUsers;

  if (usersLength) {
    totalUsers = (
      <p className="font-light text-3xl text-blue-500 ">{usersLength}</p>
    );
  }

  if (isUsersLengthLoading) {
    totalUsers = <LoadingIndicator />;
  }

  if (isUsersLengthError) {
    totalUsers = <ErrorBlock>{usersLengthError.message}</ErrorBlock>;
  }

  let totalTickets;
  let ticketsContent;

  if (tickets) {
    totalTickets = (
      <p className="font-light text-3xl text-blue-500">{tickets.length}</p>
    );
    ticketsContent = (
      <div className="bg-blueishWhite flex flex-col space-y-4 py-4 px-2 rounded-3xl shadow-lg h-full w-3/4">
        {tickets.length === 0 && (
          <p className="text-center">Oops! No tickets here.</p>
        )}
        {tickets.length > 0 && (
          <>
            <table className="text-left border-separate border-spacing-3 hidden md:table">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>More</th>
                </tr>
              </thead>
              <TicketsList tickets={tickets} />
            </table>
            <table className="text-center border-separate border-spacing-3 md:hidden">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>More</th>
                </tr>
              </thead>
              <TicketsList tickets={tickets} />
            </table>
          </>
        )}
      </div>
    );
  }

  if (isTicketsError) {
    totalTickets = <ErrorBlock>{ticketsError.message}</ErrorBlock>;
    ticketsContent = <ErrorBlock>{ticketsError.message}</ErrorBlock>;
  }

  if (isTicketsLoading) {
    totalTickets = <LoadingIndicator />;
    ticketsContent = <LoadingIndicator />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-2 space-y-12">
      <div className="flex flex-col space-y-4 items-center justify-center md:space-y-0 md:mt-0 mt-[35%] md:flex-row md:space-x-4">
        <div className="flex flex-col justify-center items-center bg-blueishWhite rounded-3xl shadow-lg px-16 py-4 ">
          <img src={userImg} className="w-8" />
          <h1 className="font-bold text-xl">Total Users</h1>
          {totalUsers}
        </div>
        <div className="flex flex-col justify-center items-center bg-blueishWhite rounded-3xl shadow-lg px-16 py-4 ">
          <img src={ticketImg} className="w-8" />
          <h1 className="font-bold text-xl">Total Tickets</h1>
          {totalTickets}
        </div>
      </div>
      {ticketsContent}
    </div>
  );
};

export default AdminDashbord;
