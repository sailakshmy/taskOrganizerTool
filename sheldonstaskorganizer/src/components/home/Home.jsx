import React, { useState } from 'react';
import Header from '../header/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/Config';
import TaskList from '../tasklist/TaskList';
import { DragDropContext } from 'react-beautiful-dnd';
import Toast from 'react-bootstrap/Toast';
import './Home.css';


const Home = ({ currentUser, currentUserId, tasks, completedTasks }) => {
  const [addTask, setTask] = useState('');
  const [addTaskError, setAddTaskError] = useState('');
  const [taskItems, setTaskItems] = useState(tasks);
  const totalTasks = taskItems.length;
  const [showToast, setToast]=useState(totalTasks>1);
  // console.log(tasks);
  const handleAddTask = (e) => {
    e.preventDefault();
    // console.log(addTask);
    auth.onAuthStateChanged(user => {
      // console.log(user.uid);
      if (user) {
        const taskNumber = tasks.length + 1;
        db.collection('tasks for user ' + user.uid)
          .add({
            TaskNumber: taskNumber,
            Task: addTask,
            TaskCompleted: false,
          })
          .then(() => {
            // setTotalTasks(taskNumber);
            setTask('');
            setToast(tasks.length > 1);
          })
          .catch(err => setAddTaskError(err.message));
      }
    })
  }

  const handleOnDrag = (result) => {
    // console.log(result);
    const { destination, source, draggableId } = result;
    //If there is no destination, it means that the item has been discarded/deleted
    if (!destination)
      return;
    //This is to check if the user has dragged and dropped the item in the same place.
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    // console.log(taskItems);
    const newTaskList = Array.from(taskItems);
    // console.log(newTaskList);
    newTaskList.splice(source.index, 1);
    // console.log(newTaskList);
    let taskModified = taskItems.filter(task => task.id === draggableId);
    // console.log("taskModified: ", taskModified);
    newTaskList.splice(destination.index, 0, ...taskModified);
    // console.log(newTaskList);
    setTaskItems([...newTaskList]);
    auth.onAuthStateChanged(user => {
      if (user) {
        for (let i = 0; i < newTaskList.length; i++) {
          db.collection('tasks for user ' + user.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (newTaskList[i].id === doc.ref.id) {
                  doc.ref.update({
                    Task: newTaskList[i].Task,
                    TaskCompleted: newTaskList[i].TaskCompleted,
                    TaskNumber: i
                  })
                }
              })
            })
        }
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
              value={addTask} onChange={(e) => setTask(e.target.value)} />
          </Col>
          <Col>
            <Button type="submit" disabled={!currentUser || addTask === ''}> Add task </Button>
          </Col>
          {!currentUser &&
            <h6>
              <Link to='/login'>Login</Link> to start organizing your tasks!!!
            </h6>}
          {addTaskError && currentUser && <p className="red-text">{`Oops! We have run into this error-${addTaskError}- while adding your task`}</p>}
        </Form>
      </Row>
      <Row className="d-flex justify-content-end">
      <Toast className='green-text' show={showToast} onClose={()=>setToast(!showToast)}>
          <Toast.Header>
            <strong className="mr-auto">Sheldon has a secret for you.</strong>
          </Toast.Header>
          <Toast.Body>Psssssttttt...Now that you have more than one task on your plate, I will let you in on a secret..
            Hovering over the checkbox of your task will enable you to drag and drop your tasks.Shhhhhhh....</Toast.Body>
        </Toast>
      </Row>
      <DragDropContext onDragEnd={(result) => handleOnDrag(result)}>
        {taskItems.length > 0 &&
          <>
            <h5 className='d-flex justify-content-center'>You have the following tasks:</h5>
            <TaskList taskList={taskItems} showCheckBox={true} currentUserId={currentUserId} />
          </>
        }
        {
          completedTasks.length > 0 &&
          <>
            <h5 className='d-flex justify-content-center'>You have completed the following tasks:</h5>
            <TaskList taskList={completedTasks} showCheckBox={false} />
          </>
        }
      </DragDropContext>
    </Container>
  )
}

export default Home;
