import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import InvalidURL from './components/invalidurl/InvalidURL';
import { auth,db } from './config/Config';


export class App extends Component {

  state={
    currentUser: null,
    tasks:[],
    completedTasks:[],
  }

  componentDidMount(){
    // getting current user
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(snapshot=>{
          this.setState({
            currentUser: snapshot.data().Name
          })
        })
      }
      else{
        console.log('user is not signed in to retrive username')
      }
    })

    // getting tasks for current user
    auth.onAuthStateChanged(user=>{
      if(user){
        const taskList = this.state.tasks;
        const completedTaskList = this.state.completedTasks;
        db.collection('tasks for user '+ user.uid)
          .onSnapshot(snapshot=>{
          let changes = snapshot.docChanges();
          console.log(changes);
          changes.forEach(change=>{
            if(change.type==='added'){
              taskList.push({
                id: change.doc.id,
                TaskNumber: change.doc.data().TaskNumber,
                Task: change.doc.data().Task,
                TaskCompleted: change.doc.data().TaskCompleted,
              })
            }
            if(change.type==='removed'){
              for(let i=0; i<taskList.length;i++){
                if(change.doc.id===taskList[i].id){
                  taskList.splice(i,1);
                }
              }
            }
            if(change.type==='modified'){
              console.log(change.type);
              for(let i=0; i<taskList.length;i++){
                console.log(change.doc.data().TaskCompleted);
                if(change.doc.id===taskList[i].id && change.doc.data().TaskCompleted===true){
                  completedTaskList.push(change.doc.data());
                  taskList.splice(i,1);
                }
              }
            }
            if(change.doc.data().TaskCompleted===true){
              for(let i=0; i<taskList.length;i++){
                console.log(change.doc.data().TaskCompleted);
                if(change.doc.id===taskList[i].id 
                  && change.doc.data().TaskCompleted===true 
                  && change.doc.id){
                  completedTaskList.push(change.doc.data());
                  taskList.splice(i,1);
                }
              }
            }
            this.setState({
              tasks: taskList,
              completedTasks: completedTaskList,
            })
          })
        })
      }
      else{
        console.log('user is not signed in to retrive todos');
      }
    })
    
  }


  render() {
    console.log(this.state.completedTasks)
    // console.log(this.state.tasks);
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
          <Home
            currentUser={this.state.currentUser}
            tasks={this.state.tasks}
            completedTasks={this.state.completedTasks}/>
          </Route>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={SignIn}/>
          <Route component={InvalidURL}/>           
        </Switch>
      </Router>
    )
  }
}

export default App;