import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Auto from './views/Auto/Auto';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration';
import TutorialsList from './views/TutorialsList/TutorialsList';
import AddTutorial from './views/AddTutorial/AddTutorial';
import Article from './views/Article/Article';
import CreateOffer from './views/CreateOffer/CreateOffer';
import Demo from './views/Demo/Demo';
import Offer from './views/Offer/Offer';

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
        <Route exact path={'/news'} component={TutorialsList} />
        <Route exact path={'/news/add'} component={AddTutorial} />
        <Route exact path={'/news/:id'} component={Article} />
        <Route exact path={'/demo'} component={Demo} />

        <Route path={'/'} exact={true} component={Home}/>
        <Route exact path={'/cars/add'} component={CreateOffer}/>
        <Route exact path={'/cars'} component={Auto}/>
        <Route exact path={'/cars/:mark'} component={Auto}/>
        <Route exact path={'/cars/:mark/:model'} component={Auto}/>
        <Route exact path={'/cars/:mark/:model/:generation'} component={Auto}/>
        <Route exact path={'/cars/:mark/:model/:generation/:offer'} component={Offer}/>

        <Route path={'/login'} component={Login}/>
        <Route path={'/registration'} component={Registration}/>
      </Switch>
    </div>
  );
}

export default App;
