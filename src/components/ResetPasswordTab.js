import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { ToastAlert } from "../utilis/ToastAlert";
import {BASE_URL} from '../config.js'


export const ResetPasswordTab = ({ user }) => {
  
  // ValidationSchema
  const passwordValidateSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  return (
    <div>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={passwordValidateSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          values.email = user.email;
          try {
            const response = await axios.post(BASE_URL+"resetPassword", values);

            if (response) {
              ToastAlert("success", response.data);
              resetForm();
            }
          } 
          catch (error) {
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-2xl">
            <br />
            <h3>Reset Password</h3>

            <div className="mb-8">
              <label className="text-white text-xs mb-3">New Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
              />

              <ErrorMessage
                className="err_msg"
                name="password"
                component="div"
              />
            </div>

            <div className="mb-8">
              <label className="text-white text-xs mb-3">
                Confirm New Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border-0 border-b outline-none bg-transparent text-sm py-2 w-full border-opacity-25"
              />

              <ErrorMessage
                className="err_msg"
                name="confirmPassword"
                component="div"
              />
            </div>

            <div className="d-grid gap-2 mt-7">
              <button
                type="submit"
                disabled={isSubmitting}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 p-2.5 rounded"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
