import { makeStyles } from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home/Home';
import Auto from './views/Auto/Auto';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';
import TutorialsList from './views/TutorialsList/TutorialsList';
import AddTutorial from './views/AddTutorial/AddTutorial';
import Tutorial from './components/Tutorial/Tutorial';

import NavBar from './components/NavBar/NavBar';

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
        <Route exact path={'/tutorials'} component={TutorialsList} />
        <Route exact path={'/add'} component={AddTutorial} />
        <Route exact path={'/tutorials/:id'} component={Tutorial} />

        <Route path={'/'} exact={true} component={Home}/>
        <Route path={'/cars'} component={Auto}/>
        <Route path={'/login'} component={Login}/>
        <Route path={'/registration'} component={Registration}/>
      </Switch>
    </div>
  );
}

export default App;
