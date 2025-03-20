
import Filter from "./components/filter/Filter"
import FilterTag from "./components/filter/filter_tag/FilterTag"
import Header from "./components/header/Header"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { TaskList } from "./Test"
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: "/",
        element: <><Filter /><FilterTag /><TaskList /></> // This will be done
      },
      {
        path: '/new-assignment',
        element: 0
      },
      {
        path: '/assignent/assignment-id',
        element: 0
      }
    ]
  }
])

function App() {
  return <RouterProvider router={routes} />
}

export default App
