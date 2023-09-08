/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    priority: "",
    status: "todo",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    const priority = form.priority.value;
    setTask({ ...task, id: uuidv4(), title, description, date, priority });
    // setTasks([...tasks, task]);
    if (task.title.length < 1) return;
    console.log(tasks);
    setTasks((pre) => {
      const list = [...pre, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    form.reset();
    console.log(title, description, date, priority);
  };
  console.log(task);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          placeholder="minimum 2 word"
          className="input input-bordered input-primary w-full max-w-xs"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          required
          name="description"
          placeholder="minimum 10 word"
          className="input input-bordered input-primary w-full max-w-xs text-justify"
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          className="input input-bordered input-primary w-full max-w-xs"
          name="date"
          required
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          required
          className="input input-bordered input-primary w-full max-w-xs"
          name="priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <button className="btn btn-primary mt-5">Create Task</button>
      </div>
    </form>
  );
};

export default CreateTask;
