import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Start from './Pages/Start/Start.tsx';
import MainLayout from './MainLayout/MainLayout.tsx';
import "./styles/index.scss";
import { UserProvider } from './context/UserContext.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';
import UserLoggedRoute from './ProtectionRoutes/UserLoggedRoute.tsx';
import Shop from './Pages/Shop/Shop.tsx';
import ProductPage from './Pages/ProductPage/ProductPage.tsx';
import Cart from './Pages/Cart/Cart.tsx';
import { CartProvider } from './context/CartContext.tsx';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop.tsx';
import SuccessPayment from './Pages/SuccessPayment/SuccessPayment.tsx';

export const API_SERVER = import.meta.env.VITE_SERVER;
// export const token = localStorage.getItem("access_token");

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
    children:[
      {
        path:"/",
        element:<Start />,
      }, 
      {
        path:"/shop",
        element:<Shop />
      },
      {
        path:"/product/:name",
        element:<ProductPage />
      },
      {
        path:"/cart",
        element:<Cart />
      },
      {
        path:"/success",
        element:<SuccessPayment/>
      }
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
  },

])

createRoot(document.getElementById('root')!).render(
    <>
    {/* <App> */}
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </UserProvider>

    {/* </App> */}
    </>
  ,
)
