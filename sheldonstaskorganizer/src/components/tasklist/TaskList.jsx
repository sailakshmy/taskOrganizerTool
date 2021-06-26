import React from 'react';
import TaskItem from '../taskitem/TaskItem';

const TaskList = ({taskList}) => {
  // console.log(taskList);
  return (
      taskList.map(task=><TaskItem task={task} key={task.id}/>)
  )
}

export default TaskList;