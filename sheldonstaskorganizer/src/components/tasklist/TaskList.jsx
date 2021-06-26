import React from 'react';
import TaskItem from '../taskitem/TaskItem';

const TaskList = ({taskList, showCheckBox}) => {
  // console.log(taskList);
  return (
      taskList.map(task=><TaskItem task={task} key={task.id} showCheckBox={showCheckBox}/>)
  )
}

export default TaskList;