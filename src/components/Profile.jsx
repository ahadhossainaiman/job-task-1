import { useContext } from "react";
import { UserContext } from "../provider/AuthProviders";

const Profile = () => {
  const { user, profile } = useContext(UserContext);
  return (
    <div className="mx-auto">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img src={user?.photoURL} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Username: {user?.displayName}</h2>
          <h2 className="card-title">Email: {user?.email}</h2>
          <p>Bio: {profile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
