"use client";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

const Book = () => {
  const validationSchema = Yup.object({
    collegeId: Yup.string().required("Required"),
  });
  const { currentUser } = useAuth();
  const initialValues = {
    name: "",
    collegeId: "",
    phone: "",
    fromDate: "",
    toDate: "",
    timeRange: "",
    designation: "",
    message: "",
    location: "",
  };
  const router = useRouter();
  async function onSubmit(values) {
    const {
      name,
      collegeId,
      phone,
      fromDate,
      toDate,
      timeRange,
      message,
      location,
      designation,
    } = values;
    if (currentUser) {
      try {
        const refDoc = await addDoc(collection(db, "bookings"), {
          bookingBy: currentUser.email,
          name: name,
          collegeId,
          phone,
          fromDate,
          toDate,
          timeRange,
          message,
          location,
          designation,
          status: "Pending",
        });

        const userDoc = doc(db, `users/${currentUser.uid}`);
        await updateDoc(userDoc, { bookings: arrayUnion(refDoc.id) });
        router.push("/dashboard");
        toast.success(`Booking created successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error(error.message, {
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
    } else {
      toast.error("You must login to make a booking", {
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
  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Book an Auditorium
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="py-4 px-6" action="" method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="collegeId"
            >
              Roll No/Employee Id
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="collegeId"
              name="collegeId"
              type="text"
              placeholder="Enter your Roll No/Employee Id"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="designation"
              name="designation"
              placeholder="Enter any additional information"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              From Date
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="fromDate"
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              To Date
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="toDate"
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              name="timeRange"
              placeholder="Select a time"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <Field
              as="select"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              name="location"
            >
              <option value="">Select a location</option>
              <option value="conference">Conference Hall</option>
              <option value="seminar1">Seminar Hall 1</option>
              <option value="seminar2">Seminar Hall 2</option>
              <option value="seminar3">Seminar Hall 3</option>
              <option value="cathall">CAT Hall</option>
              <option value="goldenjublie">Golden Jublie Hall</option>
              <option value="community">Community Hall</option>
              <option value="clubhouse">Club House</option>
              <option value="gpbirlaauditorium">GP Birla Auditorium</option>
              <option value="others">Others</option>
            </Field>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <Field
              as="textarea"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              rows={4}
              placeholder="Specify why it is required"
              defaultValue={""}
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!currentUser}
            >
              {currentUser ? "Request Booking" : "Please Login to Proceed"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Book;
