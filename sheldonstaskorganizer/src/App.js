import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
