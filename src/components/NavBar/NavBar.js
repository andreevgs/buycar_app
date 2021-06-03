import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
                <Button color="inherit" className={classes.menuButton} variant="outlined">войти</Button>
                <Button color="inherit" variant="outlined">регистрация</Button>
            </Toolbar>
        </AppBar>
    );
  }
  
  export default NavBar;