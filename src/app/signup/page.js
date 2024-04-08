"use client";
import React, { useState } from "react";
import "./page.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });
  const { signUp } = useAuth();
  const onSubmit = async (values) => {
    const { email, password, name } = values;
    try {
      await signUp(email, password, name);
      router.push("/");
    } catch (error) {
      // An error occurred. Set error message to be displayed to user
      console.log(error);
      if (error.message.includes("email-already")) {
        toast.error("Email Already In Use", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="w-[50%] mx-auto py-10 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form
            action="#"
            method="POST"
            className="shadow-md border rounded-md my-10 flex px-10 py-3  bg-opacity-40 bg-gray-300 flex-col"
          >
            <Link href="/" className="logo_container mx-auto"></Link>
            <div className="title_container">
              <h2 className="title">SignUp</h2>
              <span className="subtitle">
                Get started with our website, just create an account and enjoy
                the experience.
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                placeholder="John Doe"
                id="name"
                name="name"
                required=""
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                placeholder="name@mail.com"
                type="email"
                id="email"
                name="email"
                required=""
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" className="btn-signup">
              Signup
            </button>
            <div className="separator">
              <hr className="line" />
              <span className="text-white">Or</span>
              <hr className="line" />
            </div>
            <div className="text-white flex justify-between flex-row ">
              <span className="">Already have an account?</span>
              <Link className="text-blue-600 underline" href={"/login"}>
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
