import Header from "./components/header/Header"
import { RouterProvider, createBrowserRouter } from "react-router-dom"


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: "/",
        element: 0 // This will be done
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
