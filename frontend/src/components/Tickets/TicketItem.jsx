import { Link } from "react-router-dom";

const TicketItem = ({ id, author, title, date }) => {
  const isoDate = new Date(date);

  const year = isoDate.getFullYear();
  const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
  const day = isoDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return (
    <tbody>
      <tr className="hidden md:table-row">
        <td className="capitalize">{author}</td>
        <td className="capitalize">{title}</td>
        <td>{formattedDate}</td>
        <td>
          <Link
            to={`/admin/tickets/${id}`}
            className="underline underline-offset-2"
          >
            View more &rarr;
          </Link>
        </td>
      </tr>
      <tr className="md:hidden table-row">
        <td>{author}</td>
        <td>
          <Link to={`/admin/tickets/${id}`} className="underline">
            View more &rarr;
          </Link>
        </td>
      </tr>
    </tbody>
  );
};

export default TicketItem;
