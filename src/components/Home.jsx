import { useContext } from "react";
import { UserContext } from "../provider/AuthProviders";

const Home = () => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <h1>This is Home {user.name}</h1>
    </div>
  );
};

export default Home;
