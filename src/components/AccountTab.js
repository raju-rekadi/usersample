import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastAlert } from "../utilis/ToastAlert";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import {BASE_URL} from '../config.js'

export const AccountTab = ({ user }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(new Date(user.date));

  // Form Validations
  const UserSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(15, "First Name must not exceed 15 characters"),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(15, "Last Name must not exceed 15 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  // Intails Values of form
  const initialValues = {
    first_name: user.firstname,
    last_name: user.lastname,
    email: user.email,
    gender: user.gender,
    date: user.date,
    status: user.status,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values",values)
           const valuesObj = values
                var todayDate = startDate.toISOString().slice(0, 10);
                const daterr      = new Date(todayDate);
                const next_date = new Date(daterr.setDate(daterr.getDate() + 1));
                var todayDate2 = next_date.toISOString().slice(0, 10);

                valuesObj.date = todayDate2
          setIsSubmit(true);
          const response = await axios.put(
            BASE_URL + `updateUser/${user.id}`,
            valuesObj
          );

          if (response) {
            localStorage.setItem("user", JSON.stringify(response.data.userObj));
            ToastAlert("success", "Updated your details successfully.");
          }
          setTimeout(() => {
            setIsSubmit(false);
          }, 5000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <section>
              <div className="max-w-2xl">
                <h3 className="mt-4 mb-4">Personal Info</h3>
                <div className="mb-2">
                  <label className="text-white text-xs mb-3">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    disabled="true"
                    placeholder="Email Address"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="mb-2">
                  <label className="text-white text-xs mb-3">First Name</label>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />
                  <ErrorMessage
                    className="err_msg"
                    name="first_name"
                    component="div"
                  />
                </div>
                <div className="mb-2">
                  <label className="text-white text-xs mb-3">Last Name</label>

                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
                  />

                  <ErrorMessage
                    className="err_msg"
                    name="last_name"
                    component="div"
                  />
                </div>

                <div className="flex justify-between text-white">
                  <div>
                    <div className="mt-1.5">
                      <label className='text-white'>Gender</label>
                    </div>
                    <div className="form-group px-3 py-1.5 w-full border border-gray-300 rounded-lg mb-1">
                      <div role="group" aria-labelledby="my-radio-group">
                        <label className="mr-4 pr-2 text-white">
                          <Field
                            class="mr-1"
                            type="radio"
                            name="gender"
                            value="Male"
                          />
                          Male
                        </label>
                        <label className='text-white'>
                          <Field
                            class="mr-1"
                            type="radio"
                            name="gender"
                            value="Female"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-1.5">
                      <label className='text-white'>Status</label>
                    </div>
                    <Field
                      name="status"
                      as="select"
                      className="border rounded-lg border-gray-300 text-black block w-full px-12 py-1.5 bg-transparent text-white outline-0"
                    >
                      <option value="pending">
                        Pending
                      </option>
                      <option value="active">Active</option>
                      <option value="de-active">De-Active</option>
                    </Field>
                  </div>
                  <div>
                    <div className="mx-5 mt-1.5">
                      <label className='text-white'>Date</label>
                    </div>
                    <div className="form-group px-3 py-1.5 border border-gray-300 rounded-lg mx-5 mb-1 text-black bg-transparent">
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    // disabled={isSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};
