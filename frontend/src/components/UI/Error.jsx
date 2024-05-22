import { Link } from "react-router-dom";

const Error = ({ error }) => {
  let errorTitle;
  let errorMsg;

  if (error.status === 404) {
    errorTitle = "404";
    errorMsg = "Oops! Page Not Found.";
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-7xl font-bold ">{errorTitle}</h1>
      <p className="text-xl">{errorMsg}</p>
      {error.status === 404 && (
        <Link to="/" className="underline underline-offset-2 block mt-2">
          Back to login page
        </Link>
      )}
    </div>
  );
};

export default Error;
