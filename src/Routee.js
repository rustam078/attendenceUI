import {  createBrowserRouter,Outlet,RouterProvider,Route,Navigate } from 'react-router-dom';
import App from './App';
import Details from './Components/Details';
import Header from './Components/Header';
import Calender from './Components/Calender';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children:[
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <App/>,
      },
      {
        path: "details",
        element: <Details/>,
        children:[
      {
        path: ":name",
        element: <Calender/>,
      }
        ]
      },
    ]
  },

]);




function Routee() {
  return (
        <RouterProvider router={router}/>
     
  );
}


export default Routee;
