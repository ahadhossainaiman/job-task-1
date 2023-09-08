/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { UserContext } from "../provider/AuthProviders";

const ListTasks = ({ tasks, setTasks }) => {
  const user = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("All");
  useEffect(() => {
    const filterTodos = tasks?.filter((task) => task.status === "todo");
    const filterInProgress = tasks?.filter(
      (task) => task.status === "inprogress"
    );
    const filterComplete = tasks?.filter((task) => task.status === "complete");
    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setComplete(filterComplete);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "complete"];
  const handleSearch = (e) => {
    setSelectedPriority(e.target.value);
  };
  console.log(selectedPriority);
  return (
    <div>
      <select
        required
        className="input input-bordered input-primary w-full max-w-xs block mx-auto my-8"
        name="priority"
        value={selectedPriority}
        onChange={handleSearch}
      >
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="flex lg:flex-row gap-20 sm:flex-col">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            complete={complete}
            selectedPriority={selectedPriority}
          />
        ))}
      </div>
    </div>
  );
};

export default ListTasks;

const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  complete,
  selectedPriority,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "complete") {
    text = "Complete";
    bg = "bg-green-500";
    tasksToMap = complete;
  }

  const addItemToSection = (id) => {
    // console.log("droped", id, status);
    setTasks((prev) => {
      //   console.log("aiman", prev);
      const modifyTask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      //   console.log(modifyTask);
      localStorage.setItem("tasks", JSON.stringify(modifyTask));
      return modifyTask;
    });
  };
  console.log("a", selectedPriority);

  const filterPriority = tasksToMap?.filter(
    (fTask) => fTask.priority === selectedPriority
  );
  console.log(tasks);
  console.log(filterPriority);
  return (
    <div
      ref={drop}
      className={`w-80 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      {selectedPriority === "All"
        ? tasksToMap.length > 0 &&
          tasksToMap?.map((task) => (
            <Task
              key={task?.id}
              task={task}
              status={status}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))
        : filterPriority.map((task) => (
            <Task
              key={task?.id}
              task={task}
              status={status}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, state, tasks, setTasks }) => {
  //   console.log(task);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  //   console.log(isDragging);
  const handleRemove = (id) => {
    const fTasks = tasks?.filter((tas) => tas.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
  };

  let bg;
  if (task.priority === "Low") {
    bg = "bg-green-300";
  }
  if (task.priority === "Medium") {
    bg = "bg-orange-300";
  }
  if (task.priority === "High") {
    bg = "bg-red-300";
  }
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab whitespace-nowrap`}
    >
      <h1 className="text-2xl mb-4 uppercase font-bold">{task?.title}</h1>
      <h1 className="my-5 bg-slate-200 relative p-3 rounded-md">
        {task?.description}
      </h1>
      <h1 className={`${bg} mb-5 w-[50%] pl-5 rounded-md uppercase font-black`}>
        {task?.priority}
      </h1>
      <small className="absolute bottom-1 left-1 ">{task?.date}</small>
      <button
        className="absolute bottom-1 right-1"
        onClick={() => handleRemove(task?.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};
