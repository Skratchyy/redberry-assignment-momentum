import Header from "./components/header/Header"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />
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
