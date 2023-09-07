import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../provider/AuthProviders";
import { useContext } from "react";

const Login = () => {
  const { signInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);

        navigate("/profile");

        form.reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content">
        <div className="card max-w-sm shadow-2xl bg-base-100 py-11 px-[20%] border-green-200">
          <h1 className="text-center text-6xl">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered w-[100%]"
                required
              />
            </div>
            <div className="form-control w-[100%]">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <label className="label">
              <Link to="/register" className="label-text-alt link link-hover">
                Do not have account?
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
