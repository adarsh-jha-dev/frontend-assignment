import React, { useContext, useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (authContext.user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSignup = async () => {
    setLoading(true);
    try {
      await authService.createAccount({
        email: user.email,
        password: user.password,
        username: user.username,
      });
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled = !user.email || !user.password || !user.username;

  return (
    <div className="flex flex-col justify-center bg-gray-600 items-center min-h-screen py-2">
      {error && <h1 className="text-center font-bold text-white">{error}</h1>}
      <h1 className="text-2xl pb-3">{loading ? "Processing..." : "Signup"}</h1>
      <div className="flex justify-center flex-col border w-[350px] border-white p-6 rounded-2xl">
        <div className="flex flex-col justify-evenly ">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => handleChange(e)}
            placeholder="Username"
            name="username"
          />
        </div>
        <div className="flex pb-2 flex-col justify-evenly ">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="flex flex-col justify-evenly ">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            name="password"
          />
        </div>
        <div className=" flex flex-col justify-evenly">
          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className="pt-2 pb-2 pr-1 cursor-pointer pl-1 w-[60%] ml-[20%] border hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Sign Up
          </button>
          <Link className="text-center hover:underline" to="/login">
            Visit login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
