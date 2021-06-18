import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        textDecoration: 'none',
        color: 'inherit',
    },
    title: {
        textDecoration: 'none',
        color: 'inherit',
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    sideBarButton: {
        textDecoration: 'none',
    }
}));

const NavBar = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileView, setMobileView] = useState(false);
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setMobileView(true)
            : setMobileView(false);
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        }
      }, []);

    const handleClick = (event) => {
        console.log('setAnchorEl: ', [anchorEl]);
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        handleClose();
        dispatch(logout());
    };
  
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            {currentUser ? (
                <List>
                    <Link to="/add" color="primary" className={classes.sideBarButton}>
                        <ListItem button>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Add" />
                        </ListItem>
                    </Link>
                {['Log out'].map((text, index) => (
                    <ListItem onClick={logOut} button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            ) : (
                <List>
                    <Link to="/login" color="primary" className={classes.sideBarButton}>
                        <ListItem button>
                            <ListItemText primary="Войти" />
                        </ListItem>
                    </Link>
                    <Link to="/registration" color="primary" className={classes.sideBarButton}>
                        <ListItem button>
                            <ListItemText primary="Зарегистрироваться" />
                        </ListItem>
                    </Link>
                </List>
            )}
            
        </div>
    );

    console.log('state: ', [anchorEl]);

    const displayDesktop = () => {
        return (
            <Toolbar>
                <Link to="/" className={classes.title}>
                    <Typography variant="h6">BUYCAR</Typography>
                </Link>
                
                {/* <Link to="/cars" className={classes.menuButton}><Button color="inherit">авто</Button></Link> */}
                <Link to="/tutorials" className={classes.menuButton}><Button color="inherit">обзоры</Button></Link>

                {currentUser ? (
                    <div>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <AccountCircleIcon className={classes.icon} />глеб
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><Link to="/cars/add">Подать объявление</Link></MenuItem>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                    ) : (
                        <div>
                            <Link to="/login" className={classes.menuButton}><Button color="inherit" variant="outlined">вход</Button></Link>
                            <Link to="/registration" className={classes.menuButton}><Button color="inherit" variant="outlined">регистрация</Button></Link>
                        </div>
                    )}
            </Toolbar>
            );
    };
    
    const displayMobile = () => {
        return (
          <Toolbar>
            <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                >
                    {list(anchor)}
                </SwipeableDrawer>
                </React.Fragment>
            ))}
            </div>
          </Toolbar>
        );
    };

    return (
        <AppBar position="fixed" color="default">
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    );
  }
  
  export default NavBar;