import React from 'react'
import Task from './Task'

const StatusLine = (props) => {
    const {status, tasks, addTask, delTask, addEmptyTask, moveTask}= props;

    let taskList, tasksForStatus;

    function handleAddEmpty(){
        addEmptyTask(status)
    }

    if(tasks){
        tasksForStatus=tasks.filter((tasks) => {return tasks.status===status;})
    }

    if(tasksForStatus){
        taskList = tasksForStatus.map((tasks) => {
            return(
                <Task
                addTask={(tasks) => addTask(tasks)}
                delTask={(id) => delTask(id)}
                moveTask={(id, status) => moveTask(id, status)}
                key={tasks.id}
                tasks={tasks}
                />
            )
        })
    }

  return (
    <div className='statusLine'>
        <h3>{status}</h3>
        {taskList}
        <button onClick={handleAddEmpty} className='addBtn'>+</button>
    </div>
  )
}

export default StatusLine