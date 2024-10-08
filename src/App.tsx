import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import {
  Database,
  Detail,
  Favorites,
  ErrorPage as Error,
} from './components/pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route } from './constants'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Navigate to={Route.Search} />,
      },
      {
        path: Route.Search,
        element: <Database />,
      },
      {
        path: Route.Favorites,
        element: <Favorites />,
      },
      {
        path: `${Route.Detail}/:movieId`,
        element: <Detail />,
      },
    ],
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
