import { useRouteError } from "react-router-dom";

import Error from "../components/UI/Error";

const ErrorPage = () => {
  const error = useRouteError();

  return <Error error={error} />;
};

export default ErrorPage;
