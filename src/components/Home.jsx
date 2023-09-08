import { useContext, useEffect, useState } from "react";
import { UserContext } from "../provider/AuthProviders";
import CreateTask from "./CreateTask";
import ListTasks from "./ListTasks";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Home = () => {
  const user = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage?.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage?.getItem("tasks")));
    }
  }, []);
  console.log("task", tasks);
  // console.log(user);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" h-screen flex flex-col items-center pt-3 gap-20 mx-5">
        <div className="flex gap-5 items-center text-3xl">
          <div className="avatar online">
            <div className="w-24 rounded-full">
              <img src={user.user.photoURL} />
            </div>
          </div>
          <h1>{user.user.displayName}</h1>
        </div>

        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default Home;
