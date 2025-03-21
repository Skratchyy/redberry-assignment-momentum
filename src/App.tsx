import Header from "./components/header/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import NewAssignment from "./views/NewAssignment";
import Assignment from "./views/Assignment";

const routes = createBrowserRouter([
  {
    path: "/redberry-assignment-momentum",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-assignment",
        element: <NewAssignment />,
      },
      {
        path: "/assignment/:id",
        element: <Assignment />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
