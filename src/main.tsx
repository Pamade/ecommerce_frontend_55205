import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Start from './Pages/Start/Start.tsx';
import MainLayout from './MainLayout/MainLayout.tsx';
import "./styles/index.scss";
import { UserProvider } from './context/UserContext.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';
import UserLoggedRoute from './ProtectionRoutes/UserLoggedRoute.tsx';

export const API_SERVER = import.meta.env.VITE_SERVER;
export const token = localStorage.getItem("access_token");

const router = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:"/",
        element:<Start />,
      }, 
    ]
     // i want to have header and side nav on every page
  },
  {
    path:"/login",
    element:(
      <UserLoggedRoute><Login /></UserLoggedRoute>
    )
  },
  {
    path:"/register",
    element:(
      <UserLoggedRoute><Register /></UserLoggedRoute>
    )
  }
])

createRoot(document.getElementById('root')!).render(
    <>
    {/* <App> */}
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>

    {/* </App> */}
    </>
  ,
)
