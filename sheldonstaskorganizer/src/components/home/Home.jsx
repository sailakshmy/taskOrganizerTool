import React, { useState } from 'react';
import Header from '../header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import { auth,db } from '../../config/Config';

import './Home.css';


const Home = ({ currentUser }) => {
  const [addTask,setTask] = useState('');
  const [addTaskError, setAddTaskError]= useState('');
  const [totalTasks, setTotalTasks]= useState(0);
  const handleAddTask=(e)=>{
    e.preventDefault();
   // console.log(addTask);
    auth.onAuthStateChanged(user=>{
     // console.log(user.uid);
      if(user){
        const taskNumber = totalTasks+1;
        db.collection('tasks for user '+ user.uid)
          .add({
            TaskNumber: taskNumber,
            Task: addTask,
            TaskCompleted: false,
          })
          .then(()=>{
            setTotalTasks(taskNumber);
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
        <Button type="submit" disabled={!currentUser}> Add task </Button>
        </Col>
        {!currentUser && 
      <h6>
     <Link to='/login'>Login</Link> to start organizing your tasks!!!
      </h6>}
      {addTaskError && currentUser && <p className="red-text">{`Oops! We have run into this error-${addTaskError}- while adding your task`}</p>}
      </Form>
      </Row>

     
    </Container>
  )
}

export default Home;
