import ReactDOM from 'react-dom/client'
import { Dashboard } from './pages/dashboard'
import { InsertPage } from './pages/insert'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './main.css'
import { Default } from './layouts/default'
import { EditPage } from './pages/edit'
import { LoginPage } from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default/>,
    errorElement: <p>erro</p>,
    children: [
      {
        path: '/',
        element: <Dashboard/>,
      },
      {
        path: '/new',
        element: <InsertPage/>
      },
      {
        path: '/edit/:id',
        element: <EditPage/>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '*',
    element:  <Navigate to='/'/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>,
)
