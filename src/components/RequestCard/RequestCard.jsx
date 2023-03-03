import React from "react";
import { Link } from "react-router-dom";
import style from "./RequestCard.module.css";
import edit from "./img/edit.svg"
import trash from "./img/trash.svg"
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import requestApi from "../../utils/RequestApi";
import lodash from "lodash"

const currentDate = new Date()

export const RequestCard = ({ request, currentUser, setUpdateRequestsInCard }) => {

  const deleteRequest = (id) => {
    requestApi.deleteRequest(id)
      .then((deleteID) => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const sendForAgreement = (id) => {
    requestApi.sendForAgreement(id)
      .then((deleteID) => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const sendForApproval = (id) => {
    requestApi.sendForApproval(id)
      .then((deleteID) => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const sendToWork = (id) => {
    requestApi.sendToWork(id)
      .then((deleteID) => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const sendToArchive = (id) => {
    requestApi.sendToArchive(id)
      .then((deleteID) => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const carEnteredTheArea = (car) => {
    requestApi.carEnteredTheArea(car)
      .then(() => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const theCarLeftTheArea = (id) => {
    console.log(id)
    requestApi.theCarLeftTheArea(id)
      .then(() => {
        setUpdateRequestsInCard(prev => prev + 1);
      })
  }

  const sendToDraft = (id) => {
    console.log(id)
    // requestApi.sendToArchive(id)
    //   .then((deleteID) => {
    //     setdeleteRequest(!deleteRequestStatus);
    //   })
  }

  const renderStatusRequest = (param) => {
    switch (param) {
      case 0:
        return <span className={style.draft}>Черновик</span>;
      case 1:
        return <span className={style.agreement}>Идет согласование</span>;
      case 2:
        return <span className={style.statement}>Идет утверждение</span>;
      case 3:
        return <span className={style.approved}>Действует</span>;
      case 4:
        return <span className={style.archive}>Архив</span>;
      default:
        return 'Ошибка';
    }
  }

  const dayEnd = new Date(request.reqEnd).getDay()
  const hoursEnd = new Date(request.reqEnd).getHours()

  const dateStart = new Date(request.reqStart).setHours(0, 0, 0, 0)
  const dateEnd = new Date(request.reqEnd).setHours(0, 0, 0, 0)

  return (
    <div className={style.card}>
      <div className={style.upLine}>
        <div className={style.requestNumber}>{`Заявка №${request.reqID}`}</div>
        {request.author && (
          <div className={style.creator}>
            <span>создал:</span> <span className={style.creatorFio}>{request.author}</span>
          </div>
        )}
        {request.level === 0 || (Date.parse(currentDate) <= Date.parse(request.reqStart) || Date.parse(currentDate) <= Date.parse(request.reqEnd))
          ?
          <div className={style.requestStatus}>
            {renderStatusRequest(request.level)}
          </div>
          :
          <div className={style.requestStatus}>
            {renderStatusRequest(4)}
          </div>
        }

      </div>

      <div className={style.visitors}>
        <p className={style.requestSubTitle}>Поситители:</p>
        <div className={style.visitorsList}>
          {(request.visitors.length > 0) ? (
            request.visitors.map((visitor) => {
              return (
                <div key={visitor.visitorID} >{`${visitor.fio}`}</div>
              )
            })
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
      <div className={style.cars}>
        <p className={style.requestSubTitle}>Автомобили:</p>
        <div className={style.carsList}>
          {(request.cars.length > 0) ? (
            request.cars.map((car) => {
              return (
                <div key={car.carsID} className={style.car}>
                  {(currentUser.role.id === 1007 && car.inArea === 0) && <span><Button variant="outlined" size="small" onClick={() => carEnteredTheArea(car)}>Въезд</Button></span>}

                  {(currentUser.role.id === 1007 && car.inArea === 1) && <span><Button variant="outlined" size="small" color='secondary' onClick={() => theCarLeftTheArea(car.areaPositionID)}>Выезд</Button></span>}

                  <div className={style.gosNumber}>{car.gosNumber}</div>
                  <div>{lodash.upperFirst(car.model)}</div>
                </div>
              )
            })
          ) : (
            <div>Без А/М</div>
          )}
        </div>
      </div>



      <div className={style.endLine}>

        <div className={style.endLineContent}>

          <div className={style.endLineItem}>
            <div className={style.requestSubTitle}>Действует:</div>
            <div className={style.roleName}>
              {(dateStart === dateEnd)
                ? format(Date.parse(request.reqStart), 'dd.MM.yyyy')
                : (format(Date.parse(request.reqStart), 'dd.MM.yyyy') + " - " + format(Date.parse(request.reqEnd), 'dd.MM.yyyy'))}
            </div>
            <div className={style.interval}>
              {format(Date.parse(request.reqStart), 'HH.mm' + " - " + format(Date.parse(request.reqEnd), 'HH.mm'))}
            </div>
          </div>

          <div className={style.endLineItem}>
            <div className={style.organization}>{lodash.upperFirst(request.organization)}</div>
            <div className={style.contract}>

              {(request.contract !== '') ?
                (<>
                  Дог. №
                  <span className={style.contractNumber}>{" " + request.contract}</span>
                </>)
                : false}

            </div>
          </div>

        </div>

        <div className={style.buttonMenu}>

          <div className={style.functionLine}>
            {(currentUser.userID === request.userID && request.level === 0) ?
              <Button variant="outlined" size="small" onClick={() => sendForAgreement(request.reqID)}>На согласование</Button> : false}

            {((currentUser.role.id === 1001 || currentUser.role.id === 1002 || currentUser.role.id === 1003) && (request.level === 1) && (Date.parse(currentDate) <= Date.parse(request.reqEnd))) ?
              <Button variant="outlined" size="small" onClick={() => sendForApproval(request.reqID)}>Согласовать</Button> : false}

            {((currentUser.role.id === 1002 || currentUser.role.id === 1003) && (request.level === 1 || request.level === 2) && (Date.parse(currentDate) <= Date.parse(request.reqEnd)) && (dateStart === dateEnd && dayEnd !== 0 && dayEnd !== 6 && hoursEnd === 17)) ?
              <Button variant="outlined" size="small" onClick={() => sendToWork(request.reqID)}>Утвердить</Button> : false}

            {((currentUser.role.id === 1001 || currentUser.role.id === 1008) && (request.level === 1 || request.level === 2) && (Date.parse(currentDate) <= Date.parse(request.reqEnd))) ?
              <Button variant="outlined" size="small" onClick={() => sendToWork(request.reqID)}>Утвердить</Button> : false}

            {((currentUser.userID === request.userID && request.level === 3) && (Date.parse(currentDate) <= Date.parse(request.reqEnd))) ?
              <Button variant="outlined" size="small" onClick={() => sendToArchive(request.reqID)}>Архивировать</Button> : false}

            {((request.level === 4) || (Date.parse(currentDate) >= Date.parse(request.reqEnd))) ?
              <Button variant="outlined" size="small" onClick={() => sendToDraft(request.reqID)}>Вернуть</Button> : false}
          </div>

          {((((request.level === 0) || Date.parse(currentDate) > Date.parse(request.reqEnd)) && currentUser.userID === request.userID) || currentUser.role.id === 1001) &&
            (
              <>
                <Link className={style.link} to={"/request/" + request.reqID}>
                  <div className={style.squareButton}>
                    <img src={edit} alt="Изменить" />
                  </div>
                </Link>
                <div className={style.squareButton} onClick={() => deleteRequest(request.reqID)}>
                  <img src={trash} alt="Удалить" />
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};
