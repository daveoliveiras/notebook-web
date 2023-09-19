import React from 'react'
import ReactDOM from 'react-dom/client'
import { ListAll } from './components/list-all'
import { NewNotebook } from './components/new-notebook'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <ListAll/>
  },
  {
    path: '/new',
    element: <NewNotebook/>
  },
  {
    path: '/',
    element: <>root</>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
