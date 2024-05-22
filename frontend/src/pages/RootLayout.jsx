import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import MainNavigation from "../components/UI/MainNavigation";

import { getTime } from "../util/auth";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = getTime();

    setTimeout(() => {
      navigate("/login");
    }, timer);
  }, [navigate]);

  return (
    <>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
