import { Link, useNavigate, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const isBack = pathName.includes("/admin/tickets/");

  const navigate = useNavigate();
  return (
    <nav className="bg-blueishWhite absolute top-0 left-0 right-0 items-center py-4 px-4  W-full flex justify-between">
      {isBack && (
        <button
          onClick={() => navigate(-1)}
          className=" text-black hover:underline"
          to="./"
        >
          Back
        </button>
      )}
      <Link className="ml-auto text-black hover:underline" to="/login">
        Logout
      </Link>
    </nav>
  );
};

export default MainNavigation;
