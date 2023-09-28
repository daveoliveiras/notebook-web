import React from 'react'
import ReactDOM from 'react-dom/client'
import { ListAll } from './pages/list-all'
import { NewNotebook } from './pages/new'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'
import { Default } from './layouts/default'
import { Edit } from './pages/edit'

const router = createBrowserRouter([
{
    path: '/',
    element: <Default/>,
    children: [
      {
        path: '/',
        element: <ListAll/>
      },
      {
        path: '/new',
        element: <NewNotebook/>
      },
      {
        path: '/edit/:id',
        element: <Edit/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>,
)
