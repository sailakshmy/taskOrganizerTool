import React, { useState } from 'react';
import Header from '../header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import { auth,db } from '../../config/Config';
import TaskList from '../tasklist/TaskList';

import './Home.css';


const Home = ({ currentUser, tasks, completedTasks }) => {
  const [addTask,setTask] = useState('');
  const [addTaskError, setAddTaskError]= useState('');
  // const [totalTasks, setTotalTasks]= useState(0);
  // console.log(tasks);
  const handleAddTask=(e)=>{
    e.preventDefault();
   // console.log(addTask);
    auth.onAuthStateChanged(user=>{
     // console.log(user.uid);
      if(user){
        const taskNumber = tasks.length+1;
        db.collection('tasks for user '+ user.uid)
          .add({
            TaskNumber: taskNumber,
            Task: addTask,
            TaskCompleted: false,
          })
          .then(()=>{
            // setTotalTasks(taskNumber);
            setTask('');
          })
          .catch(err=>setAddTaskError(err.message));
      }
    })
  }
  return (
    <Container fluid>
      <Row>
      <Header currentUser={currentUser} />
      </Row>
      <Row className="d-flex justify-content-center vertical-center">
      <Form inline className="d-flex justify-content-center vertical-center" onSubmit={handleAddTask}>
        <Col>
        <Form.Control className="d-flex justify-content-center" 
          disabled={!currentUser} placeholder="Add your task here"
          value={addTask} onChange={(e)=>setTask(e.target.value)}/>
        </Col>
        <Col>
        <Button type="submit" disabled={!currentUser || addTask===''}> Add task </Button>
        </Col>
        {!currentUser && 
      <h6>
     <Link to='/login'>Login</Link> to start organizing your tasks!!!
      </h6>}
      {addTaskError && currentUser && <p className="red-text">{`Oops! We have run into this error-${addTaskError}- while adding your task`}</p>}
      </Form>
      </Row>
      <TaskList taskList={tasks} showCheckBox={true}/>
      {
        completedTasks.length >0 && 
        <>
      <h5 className='d-flex justify-content-center'>You have completed the following tasks:</h5>
      <TaskList taskList={completedTasks} showCheckBox={false}/>
        </>
      }
   
    </Container>
  )
}

export default Home;
