import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authContext.user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userdata = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      login(userdata);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled = !formData.password || !formData.email;

  return (
    <div className="flex flex-col justify-center bg-gray-600 items-center min-h-screen py-2">
      {error && <h1 className="text-center font-bold text-white">{error}</h1>}
      <h1 className="text-2xl text-white pb-3">
        {loading ? "Processing..." : "Log In"}
      </h1>
      <div className="flex justify-center flex-col border w-[350px] border-white p-6 rounded-2xl">
        <div className="flex pb-2 flex-col justify-evenly ">
          <label className="text-start pb-2 text-white" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="flex flex-col justify-evenly ">
          <label className="text-start pb-2 text-white" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Password"
            name="password"
          />
        </div>
        <div className=" flex flex-col justify-evenly">
          <button
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className="pt-2 pb-2 pr-1 pl-1 w-[60%] ml-[20%] border cursor-pointer hover:bg-white transition-colors duration-200 ease-in-out hover:text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Log In
          </button>
          <Link className="text-center hover:underline" to="/signup">
            Visit Sign Up page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
