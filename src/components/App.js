import StatusLine from './StatusLine';
import { useState, useEffect } from 'react';
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('using Effect');
  }, []);

  function addEmptyTask(status) {const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {let filteredTasks = tasks.filter((task) => {
    return task.id !== taskToAdd.id;
  });

  let newTaskList = [...filteredTasks, taskToAdd];

  setTasks(newTaskList);

  
}

function delTask(taskId) {
  let filteredTasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  setTasks(filteredTasks);

}

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
        return task.id === id;
      })[0];
  
      let filteredTasks = tasks.filter((task) => {
        return task.id !== id;
      });
  
      task.status = newStatus;
  
      let newTaskList = [...filteredTasks, task];
  
      setTasks(newTaskList);
  }
  function saveToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function laodTasks() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
  }
  }
  return (
    <div className="App">
      <h1>Let's Be Productive!</h1>
      <main>
        <section>
          <StatusLine tasks={tasks} addEmptyTask={addEmptyTask} addTask={addTask} delTask={delTask} moveTask={moveTask} status="Backlog"/>
          <StatusLine tasks={tasks} addEmptyTask={addEmptyTask} addTask={addTask} delTask={delTask} moveTask={moveTask} status="In Progress" />
          <StatusLine tasks={tasks} addEmptyTask={addEmptyTask} addTask={addTask} delTask={delTask} moveTask={moveTask} status="Done" />
        </section>
      </main>
    </div>
  );
}

export default App;
