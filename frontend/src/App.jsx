import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AuthFormPage from "./pages/AuthFormPage";
import RootLayout from "./pages/RootLayout";
import TicketDetailPage from "./pages/TicketDetailPage";
import AdminDashbordPage from "./pages/AdminDashbordPage";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import ErrorPage from "./pages/ErrorPage";

import { adminAuthLoader, userAuthLoader, authLoader } from "./util/loaders";

import { queryClient } from "./util/http";

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "/submit-ticket",
        element: <SubmitTicketPage />,
        loader: userAuthLoader,
      },
      {
        path: "/admin/tickets",
        element: <AdminDashbordPage />,
        loader: adminAuthLoader,
      },
      {
        path: "/admin/tickets/:id",
        element: <TicketDetailPage />,
        loader: adminAuthLoader,
      },
    ],
  },
  { path: "/login", element: <AuthFormPage />, loader: authLoader },
  { path: "/signup", element: <AuthFormPage />, loader: authLoader },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
