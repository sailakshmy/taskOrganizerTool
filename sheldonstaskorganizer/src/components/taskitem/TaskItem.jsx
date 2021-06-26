import React,{useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {Icon} from 'react-icons-kit';
import {edit3} from 'react-icons-kit/feather/edit3';
import {trash2} from 'react-icons-kit/feather/trash2';

const TaskItem = ({task}) => {
  // eslint-disable-next-line
  const [taskEditable, setTaskEditable]= useState(true);
  return (
    <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
    </InputGroup.Prepend>
    <FormControl
    readOnly={taskEditable}
     value={task.Task}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
     {/* <FormControl
     value={task.TaskNumber}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    /> */}
    <InputGroup.Append>
      <Button variant='outline-info'><Icon size={18} icon={edit3}/></Button>
      <Button variant='outline-danger'><Icon size={18} icon={trash2}/></Button>
    </InputGroup.Append>
  </InputGroup>
  )
}

export default TaskItem;