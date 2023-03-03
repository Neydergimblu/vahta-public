import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./Processing.module.css";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { RequestCard } from "../../components/RequestCard/RequestCard";
import requestApi from "../../utils/RequestApi";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { DashboardContext } from "../../context/dashboardContext";


export const Processing = ({queryRan, updateRequests, setUpdateRequests}) => {
  const [requests, setRequests] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [requestEmpty, setRequestEmpty] = useState(false);
  const { currentUser } = useContext(DashboardContext);
  const [value, setValue] = useState('1')
  const [currentDate, setCurrentDate] = useState(new Date())
  const effectRan = useRef(false)
  
  

  useEffect(() => {
    document.title = "Обработка заявок";
  }, [])

  useEffect(() => {
    if (effectRan.current === true) {
      requestApi.getAllRequestsForProcessing()
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

  // console.log(requests);

  const notice = (message) => {
    return <div className={style.notice}>{message}</div>
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fallsIntoThePeriod = (currentDate, request) => {
    return (Date.parse(currentDate) <= Date.parse(request.reqStart) || Date.parse(currentDate) > Date.parse(request.reqStart)) && Date.parse(currentDate) <= Date.parse(request.reqEnd)
  }

  const requestSearch = requests?.filter(request => {

    return (
      request.organization?.toLowerCase().includes(searchRequest.toLowerCase()) ||
      request.cars?.some(e => { return e.model.toLowerCase().includes(searchRequest.toLowerCase()) || e.gosNumber.toLowerCase().includes(searchRequest.toLowerCase()) }) ||
      request.visitors?.some(e => { return e.fio.toLowerCase().includes(searchRequest.toLowerCase()) }) ||
      request.author?.toLowerCase().includes(searchRequest.toLowerCase())
    )

  })

  return (
    <div className={style.page}>
      <h1 className={style.title}>Обработка заявок</h1>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable"
            scrollButtons="auto">
            <Tab label="Ждут согласования" value="1" />
            <Tab label="Действующие" value="2" />
            <Tab label="Архивные" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SearchForm setSearchRequest={setSearchRequest} />
          {requestEmpty === true && notice('Заявки не найдены')}

          <div className={style.requestCards}>
            {(requests?.length > 0)
              ?
              requestSearch.map((request) => {
                // console.log(request)
                if ((request.level >= 1 && request.level <= 2) && (fallsIntoThePeriod(currentDate, request))) {
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
          {requestEmpty === true && notice('Заявки не найдены')}
          <div className={style.requestCards}>
            {(requests?.length > 0)
              ?
              requestSearch.map((request) => {
                if ((request.level !== 0 && (fallsIntoThePeriod(currentDate, request))) && request.level === 3) {
                  return <RequestCard key={request.reqID} request={request} currentUser={currentUser} setUpdateRequestsInCard={setUpdateRequests} />
                } else {
                  return false
                }
              })
              : false
            }
          </div>
        </TabPanel>
        <TabPanel value="3">
          <SearchForm setSearchRequest={setSearchRequest} />
          {requestEmpty === true && notice('Заявки не найдены')}
          <div className={style.requestCards}>
            {(requests?.length > 0)
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
  )
};
