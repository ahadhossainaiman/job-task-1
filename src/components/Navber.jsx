import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../provider/AuthProviders";

const Navber = () => {
  const { user, userSignOut } = useContext(UserContext);
  const handleLogOut = () => {
    userSignOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/login">LogIn</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Task</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>{user && <Link to="/profile">Profile</Link>}</li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogOut} className="btn ml-5">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navber;
