import { makeStyles } from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home/Home';
import Auto from './views/Auto/Auto';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App" className={classes.root}>
      <NavBar />
      <Switch>
        <Route path={'/cars'} component={Auto}/>
        <Route path={'/'} exact={true} component={Home}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
