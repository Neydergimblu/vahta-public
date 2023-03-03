import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./Monitoring.module.css";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { RequestCard } from "../../components/RequestCard/RequestCard";
import requestApi from "../../utils/RequestApi";
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DashboardContext } from "../../context/dashboardContext";
import CarCard from "../../components/CarCard/CarCard";


export const Monitoring = ({ queryRan, updateRequests, setUpdateRequests }) => {
  const [requests, setRequests] = useState([])
  const [carsOnTheArea, setCarsOnTheArea] = useState([])
  const [searchRequest, setSearchRequest] = useState('')
  const [searchCars, setSearchCars] = useState('')
  const [requestEmpty, setRequestEmpty] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [value, setValue] = useState('1')
  const effectRan = useRef(false)

  const [open, setOpen] = React.useState(false);

  const { currentUser } = useContext(DashboardContext);

  const { control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset } = useForm({
      mode: "onChange"
    });

  useEffect(() => {
    document.title = "Мониторинг заявок";
  }, [])

  useEffect(() => {
    if (effectRan.current === true) {
      requestApi.getAllRequestsForMonitoring()
        .then((requests) => {
          // console.log(requests)
          if (typeof requests !== 'undefined' && typeof requests !== 'string' && requests.length > 0) {
            setRequests(requests)
            console.log(requests)
          } else {
            setRequests([])
          }
        })

      requestApi.getCarInTheArea()
        .then((cars) => {
          // console.log(requests)
          if (typeof cars !== 'undefined' && typeof cars !== 'string' && cars.length > 0) {
            setCarsOnTheArea(cars)
            console.log(cars)
          } else {
            setCarsOnTheArea([])
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
          setUpdateRequests(prev => prev + 1)
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
    return (Date.parse(currentDate) >= Date.parse(request.reqStart)) && Date.parse(currentDate) <= Date.parse(request.reqEnd)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const addCarForReglament = (data) => {
    console.log(data)
    setOpen(false);
    requestApi.addCarForReglament(data)
      .then(() => {
        setUpdateRequests(prev => prev + 1)
        reset()
      })
  }

  const requestSearch = requests?.filter(request => {
    return (
      request.organization?.toLowerCase().includes(searchRequest.toLowerCase()) ||
      request.cars?.some(e => { return e.model.toLowerCase().includes(searchRequest.toLowerCase()) || e.gosNumber.toLowerCase().includes(searchRequest.toLowerCase()) }) ||
      request.visitors?.some(e => { return e.fio.toLowerCase().includes(searchRequest.toLowerCase()) }) ||
      request.author?.toLowerCase().includes(searchRequest.toLowerCase())
    )

  })

  const carSearch = carsOnTheArea?.filter(car => {
    return (
      car.gosNumber.toLowerCase().includes(searchCars.toLowerCase()) ||
      car.model.toLowerCase().includes(searchCars.toLowerCase())
    )
  })

  return (
    <div className={style.page}>
      <h1 className={style.title}>Мониторинг заявок</h1>

      <div className={style.function}>
        <Button variant="outlined" size="large" onClick={handleClickOpen}>Машина по регламенту</ Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Машина по регламенту</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Чтобы запустить машину по регламенту заполните соответствующую форму и укажите причину для въезда на территорию.
          </DialogContentText> */}
          <form
            className={style.form}
            onSubmit={
              handleSubmit(addCarForReglament)
            }
          >
            <Controller
              name={`reason`}
              control={control}
              rules={{ required: 'Укажите причину' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormLabel id="demo-radio-buttons-group-label">Основание:</FormLabel>
                  <RadioGroup
                    onChange={onChange}
                    value={value}
                    defaultValue="disabled"
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="disabled" control={<Radio />} label="Посадка / высадка инвалида" />
                    <FormControlLabel value="special-service" control={<Radio />} label="Спецслужба" />
                    <FormControlLabel value="special-pass" control={<Radio />} label="Спецпропуск" />
                  </RadioGroup>
                </>
              )}
            />

            <Controller
              name={`model`}
              control={control}
              rules={{ required: 'Введите модель автомобиля' }}
              render={({ field: { onChange, value } }) => (
                <FormControl margin="normal" fullWidth>
                  <TextField
                    onChange={onChange}
                    value={value}
                    fullWidth
                    id="model"
                    label="Марка/модель"
                    error={errors.surname ? true : false}
                    helperText={errors?.surname?.message}
                    required
                  />
                </FormControl>
              )}
            />

            <Controller
              name={`gosNumber`}
              control={control}
              rules={{ required: 'Введите гос. номер транспортного средства' }}
              render={({ field: { onChange, value } }) => (
                <FormControl margin="normal" fullWidth>
                  <TextField
                    error={errors.name ? true : false}
                    id="gosNumber"
                    label="Гос. номер"
                    value={value}
                    onChange={onChange}
                    helperText={errors?.name?.message}
                    required
                  />
                </FormControl>
              )}
            />

          </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit(addCarForReglament)}>Сохранить</Button>
        </DialogActions>
      </Dialog>


      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable"
            scrollButtons="auto">
            <Tab label="Заявки" value="1" />
            {/* <Tab label="Посетители" value="3" /> */}
            <Tab label="Машины на территории" value="2" />

          </TabList>
        </Box>
        <TabPanel value="1">
          <SearchForm setSearchRequest={setSearchRequest} />
          {requestSearch.length === 0 && notice('Заявки не найдены')}

          <div className={style.requestCards}>
            {(requests?.length > 0)
              ?
              requestSearch.map((request) => {
                // console.log(request)
                if ((request.level === 3) && (fallsIntoThePeriod(currentDate, request))) {
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
          <SearchForm setSearchRequest={setSearchCars} />
          <div className={style.carCards}>
            {(carSearch?.length > 0)
              ?
              carSearch.map((car) => {
                return <CarCard key={car.carsID} car={car} setUpdateRequestsInCard={setUpdateRequests} />
              })
              : false
            }
          </div>
        </TabPanel>
      </TabContext>







    </div >
  )
};
