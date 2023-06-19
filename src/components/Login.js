import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastAlert } from "../utilis/ToastAlert";
import AuthContext from "../context/AuthContext";
const BASE_URL = "http://192.168.0.118:6969/"

const Login = ({ setLoginUser }) => {

  const authCtx = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showHidePassword, setShowHidePassword] = useState(false);
 
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validateSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });


  return (
    <>
      <div className="grid place-items-center mb-3">
        <img className="w-32 h-24" src="https://weboconnect.com/assets/images/white-logo.png" alt="Workflow" />
      </div>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setIsSubmit(true);
                try {
                  const response = await axios.post(BASE_URL+"login", values);
                  if (response) {
                    console.log("response",response.data)
                    ToastAlert("success", "Login Success");
                    authCtx.login(
                      response.data.token,
                      response.data.usertokenExp,
                      response.data.userObj
                    );
                    navigate("/", { replace: true });
                  }
                } catch (error) {
                  if (error.message === "") {
                    ToastAlert("error", "Server not working...Plz try again");
                  } else {
                     ToastAlert("error", error.response.data);
                  }
                  setIsSubmit(false);
                }
                setTimeout(() => {
                  setIsSubmit(false);
                }, 5000);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title py-4 text-center">Sign In</h3>
                  <hr />

                  <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="catherine.shaw@gmail.com"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                    />
                    <ErrorMessage className="err_msg" name="email" component="div" />
                  </div>

                  <div className="form-group mt-3 px-5 py-2 border border-gray-300 rounded-lg mx-5">
                    <label>Password</label>
                    <div className="flex">
                      <div className="w-full">
                        <Field
                          // type="password"
                          name="password"
                          placeholder="Password"
                          type={showHidePassword ? "text" : "password"}
                          className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-0 bg-white outline-0"
                        />
                      </div>

                      <div>
                        {showHidePassword ? (
                          <img
                            src="images/hide.png"
                            height="25px"
                            width="25px"
                            onClick={() => setShowHidePassword(false)}
                          />
                        ) : (
                          <img
                            src="images/show.png"
                            height="25px"
                            width="25px"
                            onClick={() => setShowHidePassword(true)}
                          />
                        )}
                      </div>
                    </div>
                    <ErrorMessage className="err_msg" name="password" component="div" />
                  </div>

                  <div className="d-grid gap-2 mt-7  px-5">
                    <button
                      type="submit"
                      disabled={isSubmit}
                      className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl btnPurpleColor"
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="text-center text-sm text-black py-6 bg-gray-300 rounded-b-xl bg-opacity-20">
                      You don't have an account?
                      <NavLink
                        className="greyColor font-medium text-purple-600 hover:text-purple-500 text-center py-2 ml-3 linkColor"
                        to={"/register"}
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
