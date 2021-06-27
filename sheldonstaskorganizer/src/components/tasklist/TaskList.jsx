import React from 'react';
import TaskItem from '../taskitem/TaskItem';
import {Droppable} from 'react-beautiful-dnd';

const TaskList = ({taskList, showCheckBox, currentUserId}) => {
  // console.log(taskList);
  // console.log("currentUserId: ", currentUserId);
  return (
    <Droppable droppableId={currentUserId}>
      {provided=>(
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {taskList.map((task,index)=><TaskItem task={task} key={task.id} showCheckBox={showCheckBox} index={index}/>)}
          {provided.placeholder}
        </div>
      )}
      
    </Droppable>
  )
}

export default TaskList;