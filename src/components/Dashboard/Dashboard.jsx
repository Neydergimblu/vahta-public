import React, { useContext } from "react";
import style from "./Dashboard.module.css";
import cx from "classnames";
import { DashboardItem } from "../DashboardItem/DashboardItem";
import { CloseMobileMenuButton } from "../CloseMobileMenuButton/CloseMobileMenuButton";
import { Link } from "react-router-dom";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { DashboardContext } from "../../context/dashboardContext";


export const Dashboard = () => {
  const { openMobileDashboard, dashboardItems, updateMobileDashboard, currentUser } = useContext(DashboardContext);

  const [item, setItem] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(item);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const openAdmin = () => {
    setOpen1(!open1);
  };

  const handleClick = () => {
    setOpen2(!open2);
  };

  const handleListItemClick = (event, index) => {
    setItem(index);
    setSelectedIndex(index);
  };

  const dashboardMenu = dashboardItems.map((obj) => {
    return <DashboardItem data={obj} key={obj.id} />;
  });

  return (
    <div
      className={cx(
        style.dashboard,
        openMobileDashboard === true && style.open
      )}
    >
      <CloseMobileMenuButton />
      {/* {dashboardMenu} */}

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          color: '#aaa',
          '& a': {
            color: '#666',
            textDecoration: 'none'
          },
          '& .MuiList-root>a': {
            color: '#666',
            textDecoration: 'none'
          },
          '& .MuiTypography-root': {
            fontSize: '14px'
          },
          '& .Mui-selected': {
            backgroundColor: '#8ac92626 !important'

          },
          '& .Mui-selected:hover': {
            backgroundColor: '#8ac9267d !important'
          }

        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      ><Link to="/" onClick={updateMobileDashboard}>
          <ListItemButton onClick={(event) => {
            handleListItemClick(event, 0)
          }} selected={selectedIndex === 0}>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </Link>

        {currentUser.role.id === 1001 &&
          <>
            <ListItemButton onClick={openAdmin}>
              <ListItemText primary="Администрирование" />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/users" onClick={updateMobileDashboard}>
                  <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemText primary="Пользователи" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </>
        }


        {(currentUser.role.id === 1001 || currentUser.role.id === 1002 || currentUser.role.id === 1003 || currentUser.role.id === 1004 || currentUser.role.id === 1008 || currentUser.role.id === 1007) &&
          <>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Доступ в поликлинику" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {(currentUser.role.id !== 1007) &&
                  <Link to="/request" onClick={updateMobileDashboard}>
                    <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                      <ListItemText primary="Мои заявки" />
                    </ListItemButton>
                  </Link>
                }
                {(currentUser.role.id === 1001 || currentUser.role.id === 1002 || currentUser.role.id === 1003 || currentUser.role.id === 1008) &&
                  <Link to="/processing" onClick={updateMobileDashboard}>
                    <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                      <ListItemText primary="Обработка заявок" />
                    </ListItemButton>
                  </Link>
                }

                {(currentUser.role.id === 1001 || currentUser.role.id === 1007) &&
                  <Link to="/monitoring" onClick={updateMobileDashboard}>
                    <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                      <ListItemText primary="Мониторинг" />
                    </ListItemButton>
                  </Link>
                }

              </List>
            </Collapse>
          </>
        }
      </List>

    </div>
  );
};
