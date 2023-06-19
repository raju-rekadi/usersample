import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastAlert } from "../utilis/ToastAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {BASE_URL} from '../config.js'

import axios from "axios";

const Register = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "Male",
    date: "",
    status: "pending",
    password: "",
    confirmPassword: "",
  };

  // Form Validation
  const validateSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(15, "First Name must not exceed 15 characters"),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(15, "Last Name must not exceed 15 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must not exceed 15 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  return (
    <>
      <div class="grid place-items-center mb-3">
        <img className="w-32 h-24" src="/images/logo.png" alt="Workflow" />
      </div>
      <div className="Auth-form-container">
        <div className="Auth-form mb-8">
          <div className="Auth-form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const valuesObj = values
                var todayDate = startDate.toISOString().slice(0, 10);

                valuesObj.date = todayDate
                setIsSubmit(true);
                try {
                  const response = await axios.post(
                    BASE_URL + "register",
                    valuesObj
                  );
                  if (response) {
                    ToastAlert("success", response.data);
                    setTimeout(() => {
                      navigate("/login");
                    }, 1500);
                    // console.log("response", response);
                  }
                } catch (error) {
                  if (error.message === "") {
                    ToastAlert("error", "Server not working...Plz try again");
                  } else {
                    ToastAlert("error", error.response.data);
                  }
                }
                setTimeout(() => {
                  setIsSubmit(false);
                }, 5000);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title py-1.5 text-center">
                    Sign Up
                  </h3>
                  <hr />
                  <div className="mx-5 mt-1">
                    <label>Email</label>
                  </div>

                  <div className="form-group px-5 py-1 border border-gray-300 rounded-lg mx-5 mb-1">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-1">
                    <ErrorMessage
                      className="err_msg"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="mx-5 mt-1.5">
                        <label>First Name</label>
                      </div>

                      <div className="form-group px-5 py-1 border border-gray-300 rounded-lg mx-5 mb-1">
                        <Field
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                        />
                      </div>
                      <div className="px-5 pt-1">
                        <ErrorMessage
                          className="err_msg"
                          name="first_name"
                          component="div"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mx-5 mt-1.5">
                        <label>Last Name</label>
                      </div>

                      <div className="form-group px-5 py-1 border border-gray-300 rounded-lg mx-5 mb-1">
                        <Field
                          type="text"
                          name="last_name"
                          placeholder="Last Name"
                          className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                        />
                      </div>
                      <div className="px-5 pt-1">
                        <ErrorMessage
                          className="err_msg"
                          name="last_name"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mx-5 mt-1.5">
                    <label>Status</label>
                  </div>

                  <div className="form-group px-5 py-0.5 border border-gray-300 rounded-lg mx-5 mb-1">
                    <Field
                      name="status"
                      as="select"
                      disabled
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                    >
                      <option value="pending" selected>
                        Pending
                      </option>
                      <option value="active">Active</option>
                      <option value="de-active">De-Active</option>
                    </Field>
                  </div>

                   <div className="flex justify-between">
                    <div>
                  <div className="mx-5 mt-1.5">
                    <label>Gender</label>
                  </div>
                  <div className="form-group px-3 py-1.5 w-full border border-gray-300 rounded-lg mx-5 mb-1">
                    <div role="group" aria-labelledby="my-radio-group">
                      <label className="mr-4 pr-2">
                        <Field class='mr-1' type="radio" name="gender" value="Male" />
                        Male
                      </label>
                      <label>
                        <Field class='mr-1' type="radio" name="gender" value="Female" />
                        Female
                      </label>
                    </div>
                  </div>
                    </div>
                    <div>
                  <div className="mx-5 mt-1.5">
                    <label>Date</label>
                  </div>
                  <div className="form-group px-3 py-1.5 border border-gray-300 rounded-lg mx-5 mb-1 text-black">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                    </div>
                  </div>



                  <div className="mx-5 mt-1.5">
                    <label>Password</label>
                  </div>

                  <div className="form-group px-5 py-1 border border-gray-300 rounded-lg mx-5">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-1">
                    <ErrorMessage
                      className="err_msg"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className="mx-5 mt-1.5">
                    <label>Confirm Password</label>
                  </div>

                  <div className="form-group px-5 py-1.5 border border-gray-300 rounded-lg mx-5">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="bg-gray-50 border-0 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-0 bg-white outline-0"
                    />
                  </div>
                  <div className="px-5 pt-1">
                    <ErrorMessage
                      className="err_msg"
                      name="confirmPassword"
                      component="div"
                    />
                  </div>

                  <div className="d-grid gap-2 mt-2 px-5">
                    <button
                      type="submit"
                      disabled={isSubmit}
                      className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl btnPurpleColor"
                    >
                      Continue
                    </button>
                  </div>

                  <div className="text-center text-sm text-black py-3 bg-gray-300 rounded-b-xl bg-opacity-20">
                    Already registered?{" "}
                    <NavLink
                      className="greyColor font-medium text-purple-600 hover:text-purple-500 text-center ml-3 linkColor"
                      to={"/login"}
                    >
                      Sign In
                    </NavLink>
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
export default Register;
