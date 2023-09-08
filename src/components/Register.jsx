import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../provider/AuthProviders";
// import app from "../firebase/firebase.config";
// import { getAuth } from "firebase/auth";
// import { db } from "./firebase";

// const auth = getAuth(app);

const Register = () => {
  const { createUser, updateUserProfile } = useContext(UserContext);
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const bio = form.bio.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        form.reset();
        handleUpdateUserProfile(name, photoURL, bio);
      })
      .catch((err) => console.log(err));
    console.log(name, email, password);
  };

  const handleUpdateUserProfile = (name, photoURL, bio) => {
    const profile = {
      displayName: name,
      photoURL,
      bio: bio,
    };
    updateUserProfile(profile)
      .then(() => {})
      .then((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen w-auto">
      <div className="hero-content">
        <div className="card max-w-sm shadow-2xl bg-base-100 py-11 px-[20%] border-green-200">
          <h1 className="text-center text-6xl">Register</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Fill Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="input input-bordered w-[100%]"
                required
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Photo URL"
                name="photoURL"
                className="input input-bordered w-[100%]"
                required
              />
            </div>
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
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter Your Bio"
                name="bio"
                className="input input-bordered w-[100%]"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <label className="label">
              <Link to="/login" className="label-text-alt link link-hover">
                Already Register?
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
