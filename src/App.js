import React from 'react';
import NavBar from './components/NavBar/NavBar'
import './App.css';
import { ToastContainer } from 'react-toastify';
import Signin from './components/Signin/Signin';
import SignUp from './components/SignUp/SignUp';
import Landing from './pages/Landing/Landing';
import Error404 from './pages/Error404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Download from './pages/Download/Download';


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
        element : <Signin />
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
  return (
    <>
      <ToastContainer />
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
