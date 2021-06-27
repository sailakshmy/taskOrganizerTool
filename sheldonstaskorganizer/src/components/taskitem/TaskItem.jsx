import React,{useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {Icon} from 'react-icons-kit';
import {edit3} from 'react-icons-kit/feather/edit3';
import {trash2} from 'react-icons-kit/feather/trash2';
import { auth,db } from '../../config/Config';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = ({task,showCheckBox,index}) => {
  const[taskItem, setTaskItem]=useState(task.Task);
  const[taskCompleted,setTaskCompleted]=useState(task.TaskCompleted);
  // console.log("Id: ",task.id);
  // console.log("Name:", task.Task);

  const handleDelete=(e)=>{
    // console.log(task.Task);
   // console.log(task.id);
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('tasks for user '+ user.uid)
          .doc(task.id)
          .delete();
      }
    })
  }
  const handleEdit=(e)=>{
   e.preventDefault();
   auth.onAuthStateChanged(user=>{
     if(user){
      db.collection('tasks for user '+ user.uid)
        .doc(task.id)
        .update({
          Task:taskItem
        });
     }
   })
  }
  const handleCompleted=()=>{
   // console.log(task.TaskCompleted);
    const taskComplete = !task.TaskCompleted;
   // console.log(taskComplete);
    auth.onAuthStateChanged(user=>{
      if(user){
       db.collection('tasks for user '+ user.uid)
         .doc(task.id)
         .update({
           TaskCompleted: taskComplete
         });
      }
    })
  }

  return (
     <Draggable draggableId={task.id} index={index}>
       {(provided)=>(
         <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
           <Form onSubmit={handleEdit} className="d-flex justify-content-center">
    <InputGroup>
    {showCheckBox && 
        <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={(e)=>{
          console.log(e.target.value); 
          setTaskCompleted(!taskCompleted);
          handleCompleted();
        }} 
        />
      </InputGroup.Prepend>
    }

    <FormControl
    disabled={task.TaskCompleted}
     value={taskItem}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      onChange={(e)=>{
        //console.log(e.target.value); 
        setTaskItem(e.target.value);
      }}
    />
    <InputGroup.Append>
      <Button variant='outline-info' onClick={handleEdit} disabled={task.TaskCompleted}><Icon size={18} icon={edit3}/></Button>
      <Button variant='outline-danger' onClick={handleDelete} disabled={task.TaskCompleted}><Icon size={18} icon={trash2}/></Button>
    </InputGroup.Append>
  </InputGroup>
  </Form>
         </div>
       )}
      
   </Draggable>
    
  )
}

export default TaskItem;