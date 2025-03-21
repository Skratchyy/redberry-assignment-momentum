import Header from "./components/header/Header";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import NewAssignment from "./views/NewAssignment";
import Assignment from "./views/Assignment";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "new-assignment",
        element: <NewAssignment />,
      },
      {
        path: "assignment/:id",
        element: <Assignment />,
      },
    ],
  },
], {
  basename: "/redberry-assignment-momentum"
});
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
