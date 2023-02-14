import React from 'react';
import { useState } from 'react';

const Task = (props) => {
  const { addTask, delTask, moveTask, task } = props;

  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState('');

  function setUrgency(e) {
    setUrgencyLevel(e.target.attributes.urgency.value);
  }

  function Submit(e) {
    e.preventDefalut();
    if (formAction === "save") {
        if (collapsed) {
          setCollapsed(false);
        } else {
          let newTask = {
            id: task.id,
            title: e.target.elements.title.value,
            description: e.target.elements.description.value,
            urgency: urgencyLevel,
            status: task.status,
            isCollapsed: true,
  };

  addTask(newTask)
  setCollapsed(true)
}
    }

    if (formAction === "delete") {
        delTask(task.id);
      }
    }

  function moveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "Backlog";
    } else if (task.status === "Done") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function moveRight() { let newStatus = "";

  if (task.status === "Backlog") {
    newStatus = "In Progress";
  } else if (task.status === "In Progress") {
    newStatus = "Done";
  }

  if (newStatus !== "") {
    moveTask(task.id, newStatus);
  }}

  return (
    <div className={`task ${collapsed ? 'collapsedTask' : ''}`}>
      <button onClick={moveLeft} className="button moveTask">
        &#171;
      </button>
      <form onSubmit={Submit} className={collapsed ? 'collapsed' : ''}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === 'low' ? 'selected' : ''}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            low
          </label>
          <label
            className={`medium ${urgencyLevel === 'medium' ? 'selected' : ''}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            medium
          </label>
          <label
            className={`high ${urgencyLevel === 'high' ? 'selected' : ''}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            high
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction('save');
          }}
          className="button"
        >
          {collapsed ? 'Edit' : 'Save'}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction('delete');
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={moveRight} className="button moveTask">
        &#187;
      </button>
    </div>
  );
};

export default Task;
