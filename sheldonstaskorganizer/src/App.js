import {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import InvalidURL from './components/invalidurl/InvalidURL';
import { auth,db, onAuthStateChange } from './config/Config';
import './App.css';

function App() {
  const [currentUser, setCurrentUser]= useState(null);
  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(snapshot=>{
            //console.log(snapshot.data());
            setCurrentUser(snapshot.data().Name)
          });
      }else{
        console.log('No User is currently logged in');
      }
    });
    return()=>{
      unsubscribe();
    }
  },[]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={()=><Home currentUser={currentUser}/>}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={SignIn}/>
        <Route component={InvalidURL}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
