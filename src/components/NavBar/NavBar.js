import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, withRouter} from 'react-router-dom';

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
}));

function NavBar() {
    const classes = useStyles();
  
    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <Link to="/" className={classes.title}>
                    <Typography variant="h6">BUYCAR</Typography>
                </Link>
                
                <Link to="/cars" className={classes.menuButton}><Button color="inherit">авто</Button></Link>
                <Link to="/login" className={classes.menuButton}><Button color="inherit" variant="outlined">вход</Button></Link>
                <Link to="/registration" className={classes.menuButton}><Button color="inherit" variant="outlined">регистрация</Button></Link>
            </Toolbar>
        </AppBar>
    );
  }
  
  export default NavBar;