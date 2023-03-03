import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./Request.module.css";
import { SearchForm } from "../../../components/SearchForm/SearchForm";
import { RequestCard } from "../../../components/RequestCard/RequestCard";
import requestApi from "../../../utils/RequestApi";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button/Button";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { DashboardContext } from "../../../context/dashboardContext";

export const Request = ({queryRan, updateRequests, setUpdateRequests}) => {
  const [requests, setRequests] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const { currentUser } = useContext(DashboardContext);
  const [value, setValue] = useState('1')
  const [currentDate, setCurrentDate] = useState(new Date())
  const effectRan = useRef(false)

  useEffect(() => {
    document.title = "Мои заявки";
  }, [])

  useEffect(() => {
    if (effectRan.current === true) {
    requestApi.getAllRequest(currentUser.userID)
      .then((requests) => {
        // console.log(requests)
        if (typeof requests !== 'undefined' && typeof requests !== 'string' && requests.length > 0) {
          setRequests(requests)
        } else {
          setRequests([])
        }
      })
    }
    return () => {
      effectRan.current = true
    }
  }, [updateRequests]);

  useEffect(() => {
    if (effectRan.current === true && queryRan.current === false) {
      subscribe()
    }
  }, [])

  const subscribe = async () => {
    queryRan.current = true
    try {
      await requestApi.waitRequest()
        .then(() => {
          setUpdateRequests(prev => prev+1)
        })
      await subscribe()
    } catch (e) {
      setTimeout(() => {
        subscribe()
      }, 500)
    }
  }

  const notice = (message) => {
    return <div className={style.notice}>{message}</div>
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fallsIntoThePeriod = (currentDate, request) => {
    return (Date.parse(currentDate) <= Date.parse(request.reqStart) || Date.parse(currentDate) > Date.parse(request.reqStart)) && Date.parse(currentDate) < Date.parse(request.reqEnd)
  }

  const requestSearch = requests.filter(request => {

    return (
      request.organization?.toLowerCase().includes(searchRequest.toLowerCase()) ||
      request.cars?.some(e => {
        return e.model.toLowerCase().includes(searchRequest.toLowerCase()) ||
          e.gosNumber.toLowerCase().includes(searchRequest.toLowerCase())
      }) ||
      request.visitors?.some(e => { return e.fio.toLowerCase().includes(searchRequest.toLowerCase()) })
    )

  })

  // console.log(requestSearch)

  return (
    <div className={style.page}>
      <h1 className={style.title}>Мои заявки</h1>

      <div className={style.function}>
        <Link className={style.link} to={"/request/add"}>
          <Button view="add" name="Создать" />
        </Link>
      </div>


      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable"
            scrollButtons="auto">
            <Tab label="Активные" value="1" />
            <Tab label="Архивные" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SearchForm setSearchRequest={setSearchRequest} />
          {requestSearch.length === 0 && notice('Заявки не найдены')}

          <div className={style.requestCards}>
            {(requests.length > 0)
              ?
              requestSearch.map((request) => {
                // console.log(request)
                if (request.level === 0 || (request.level >= 1 && request.level <= 3 && (fallsIntoThePeriod(currentDate, request)))) {
                  return <RequestCard key={request.reqID} request={request} currentUser={currentUser} setUpdateRequestsInCard={setUpdateRequests} />
                } else {
                  return false
                }
              })
              : false
            }
          </div>
        </TabPanel>
        <TabPanel value="2">
          <SearchForm setSearchRequest={setSearchRequest} />
          {requestSearch.length === 0 && notice('Заявки не найдены')}
          <div className={style.requestCards}>
            {(requests.length > 0)
              ?
              requestSearch.map((request) => {
                if ((request.level !== 0 && (Date.parse(currentDate) > Date.parse(request.reqStart) && Date.parse(currentDate) > Date.parse(request.reqEnd))) || request.level === 4) {
                  return <RequestCard key={request.reqID} request={request} currentUser={currentUser} setUpdateRequestsInCard={setUpdateRequests} />
                } else {
                  return false
                }
              })
              : false
            }
          </div>
        </TabPanel>
      </TabContext>





    </div>
  );
};
