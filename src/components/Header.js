import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { ToastAlert } from "../utilis/ToastAlert";
const BASE_URL = "http://192.168.0.118:6969/";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    console.log("user", user);
  }, []);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const userLogout = () => {
    alert("Are you sure want to logout?");
    authCtx.logout();
    navigate("/login");
  };

  const deleteAccount = async () => {
    alert("Are you sure want to delete account permanently?");

    try {
      const response = await axios.delete(
        BASE_URL + `deleteAccount/${user.id}`
      );
      if (response) {
        ToastAlert("success", "Account deleted");

        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.message === "") {
        ToastAlert("error", "Server not working...Plz try again");
      } else {
        ToastAlert("error", error.response.data);
      }
    }
  };

  return (
    <nav className="bg-brandColor fixed w-full mt-0 top-0 z-10">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <img
                  className="hidden lg:block h-16 w-auto mr-2"
                  src="/images/logo.png"
                  alt="Workflow"
                />
              </a>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ul className="menu">
              <li className="dropdown dropdown-6 relative">
                <p className="text-white pr-2 mr-4">
                  Welcome {user ? capitalizeFirst(user.firstname) + " !" : null}
                </p>
                <NavLink
                  to={"/profile"}
                  className="flex items-center"
                >
                  Profile
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </NavLink>
                <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6">
                  <li className="dropdown_item-2 rounded-t-xl">
                    <NavLink
                      //   style={navLinkStyles}
                      //   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      // className={({isActive}) => {return "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" + " "  + (isActive ? "border-b border-b-3" : "")}}

                      to={"/profile"}
                    >
                      Account
                    </NavLink>
                  </li>
                  <li className="dropdown_item-3">
                    <button
                      //   style={navLinkStyles}
                      //   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      // className={({isActive}) => {return "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" + " "  + (isActive ? "border-b border-b-3" : "")}}

                      onClick={() => userLogout()}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="dropdown_item-1 rounded-b-xl">
                    <button
                      //   style={navLinkStyles}
                      //   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      // className={({isActive}) => {return "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" + " "  + (isActive ? "border-b border-b-3" : "")}}

                      onClick={() => deleteAccount()}
                    >
                      Delete Account
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
