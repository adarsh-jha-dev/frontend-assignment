import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import authService from "../appwrite/auth";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full bg-black text-white rounded-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          User DashBoard
        </Typography>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-x-1">
              <span className="text-white hidden lg:inline-block">
                {currentUser.email}
              </span>
              <Button
                variant="gradient"
                size="sm"
                className="bg-white rounded-xl text-black hidden lg:inline-block"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  className=" text-white hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="gradient"
                  size="sm"
                  className="bg-white rounded-xl text-black hidden lg:inline-block"
                >
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="flex items-center gap-x-1 text-white">
          {currentUser ? (
            <div className="flex justify-between">
              <h3 className="text-white items-center mt-2 font-bold">
                {currentUser.email}
              </h3>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className="bg-black border ml-2 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out border-white"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button fullWidth variant="gradient" size="sm">
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  fullWidth
                  variant="gradient"
                  size="sm"
                  className="bg-white rounded-xl text-black"
                >
                  <span>Sign up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default StickyNavbar;
