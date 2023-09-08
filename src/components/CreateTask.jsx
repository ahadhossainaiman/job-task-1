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
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-green-500"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add Task
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="font-bold">Title:</label>
                <input
                  type="text"
                  name="title"
                  placeholder="minimum 2 word"
                  className="input input-bordered input-primary w-full max-w-xs"
                  required
                />
              </div>
              <div className="my-3">
                <label className="font-bold">Description:</label>
                <textarea
                  required
                  name="description"
                  placeholder="minimum 10 word"
                  className="input input-bordered input-primary w-full max-w-xs text-justify"
                />
              </div>
              <div className="my-3">
                <label className="font-bold ">Due Date:</label>
                <input
                  type="date"
                  className="input input-bordered input-primary w-full max-w-xs"
                  name="date"
                  required
                />
              </div>
              <div>
                <label className="font-bold">Priority:</label>
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mt-96 bg-red-500">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateTask;
