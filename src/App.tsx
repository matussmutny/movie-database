import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Database, Detail, Favorites } from './components/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Database />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'detail/:movieId',
        element: <Detail />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
