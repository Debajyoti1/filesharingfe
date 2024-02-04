import React, { useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './components/Signin/Signin';
import SignUp from './components/SignUp/SignUp';
import Landing from './pages/Landing/Landing';
import Error404 from './pages/Error404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Download from './pages/Download/Download';
import {
  notificationActions,
  notificationSelector,
} from "./redux/reducers/notificationReducer";
import { useDispatch, useSelector } from 'react-redux';


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'download/:fileId',
        element: <Download />
      }
    ]
  }
])

function App() {
  const dispatch = useDispatch();

  const { success_notification, error_notification } =
    useSelector(notificationSelector);

  useEffect(() => {
    if (error_notification) {
      toast.error(error_notification);
    } else if (success_notification) {
      toast.success(success_notification);
    }
    dispatch(notificationActions.reset());
  }, [success_notification, error_notification]);

  return (
    <>
      <ToastContainer style={{ marginTop: "60px" }} />
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
