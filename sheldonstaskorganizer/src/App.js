import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={SignIn}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
