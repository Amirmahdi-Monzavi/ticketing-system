import TicketItem from "./TicketItem";

const TicketsList = ({ tickets }) => {
  return tickets.map((ticket) => (
    <TicketItem
      key={ticket.id}
      id={ticket.id}
      author={ticket.author}
      title={ticket.title}
      date={ticket.date}
    />
  ));
};

export default TicketsList;
