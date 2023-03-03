import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom/client';
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { DashboardContext } from './context/dashboardContext';

import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Users } from './page/Users/Users';
import { AddUserPage } from './page/AddUserPage/AddUserPage';
import { ChangeUserPage } from './page/ChangeUserPage/ChangeUserPage';
import { Home } from './page/Home/Home';
import { Request } from './page/Requests/Request/Request';
import { AddRequest } from './page/Requests/AddRequest/AddRequest';
import { ChangeRequest } from './page/Requests/ChangeRequest/ChangeRequest';
import { Processing } from './page/Processing/Processing';
import { Monitoring } from './page/Monitoring/Monitoring';
import { Page404 } from './page/Page404/Page404';
import { Auth } from './page/Auth/Auth';
import { ThemeProvider, createTheme } from '@mui/material/styles'


import api from "./utils/Api";
import requestApi from "./utils/RequestApi";

import dashboardItems from "./mock/dashboardItem.json";

function App() {
  const [currentUser, setcurrentUser] = useState({})
  const [openMobileDashboard, setopenMobileDashboard] = useState(false)
  const [auth, setAuth] = useState(false);
  const [updateRequests, setUpdateRequests] = useState(0)

  const queryRan = useRef(false)

  useEffect(() => {
    if (localStorage.USER_ID) {
      // console.log('useEffect App')
      api.getUser(localStorage.USER_ID)

        .then((user) => {
          if (typeof user !== 'undefined' && user.length > 0) {
            setcurrentUser(user[0])
            { <Navigate to="/" replace={true} /> }
          }

        })
        .catch(() => {
          delete localStorage.USER_ID;
        })
    }
  }, [auth])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8ac926',
      },
      secondary: {
        main: '#6A4C93',
      },
      text: {
        primary: '#8ac926'
      },
      label: {
        main: '#8ac926'
      },
      error: {
        main: '#ff595e'
      }
    }
  });

  const updateMobileDashboard = (value) => {
    setopenMobileDashboard(value)
  }

  const Autorization = () => {
    if (currentUser.userID) {
      return (
        <>
          <Header />
          <div className={"content"}>
            <Dashboard />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<ChangeUserPage />} />
              <Route path="/users/add" element={<AddUserPage />} />

              <Route path="/request" element={<Request queryRan={queryRan} updateRequests={updateRequests} setUpdateRequests={setUpdateRequests} />} />
              <Route path="/request/add" element={<AddRequest />} />
              <Route path="/request/:id" element={<ChangeRequest />} />

              <Route path="/processing" element={<Processing queryRan={queryRan} updateRequests={updateRequests} setUpdateRequests={setUpdateRequests} />} />
              <Route path="/monitoring" element={<Monitoring queryRan={queryRan} updateRequests={updateRequests} setUpdateRequests={setUpdateRequests} />} />


              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </>)
    } else {
      return <Auth />
    }
  }

  return (
    <DashboardContext.Provider value={{ openMobileDashboard, updateMobileDashboard, dashboardItems, currentUser, setcurrentUser, auth, setAuth }}>
      <ThemeProvider theme={theme}>
        {Autorization()}
      </ThemeProvider>

    </DashboardContext.Provider>
  );
}

export default App;
