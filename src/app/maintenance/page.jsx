"use client";
import * as Yup from "yup";
import React from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

const Maintenance = () => {
  const validationSchema = Yup.object({
    quaterNo: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    period: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    employeeCode: Yup.string().required("Required"),
    designation: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    service: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });
  const initialValues = {
    quaterNo: "",
    location: "",
    period: "",
    name: "",
    employeeCode: "",
    designation: "",
    department: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  };
  const router = useRouter();
  const { currentUser } = useAuth();
  async function onSubmit(values) {
    const {
      name,
      phone,
      date,
      message,
      service,
      quaterNo,
      location,
      period,
      employeeCode,
      designation,
      department,
    } = values;
    if (currentUser) {
      try {
        const refDoc = await addDoc(collection(db, "repairs"), {
          quaterNo,
          location,
          period,
          employeeCode,
          designation,
          department,
          requestBy: currentUser.email,
          name,
          phone,
          date,
          message,
          service,
          status: "Pending",
        });

        const userDoc = doc(db, `users/${currentUser.uid}`);
        await updateDoc(userDoc, { repairs: arrayUnion(refDoc.id) });
        router.push("/dashboard");
        toast.success(`Maintenance requested successfully!`, {
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
        Request Maintenance
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="py-4 px-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="quaterNo"
            >
              Quarter No.
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quaterNo"
              type="text"
              name="quaterNo"
              placeholder="Enter your Quarter No."
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="location"
            >
              Quarter Location
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              name="location"
              placeholder="Enter your Quarter Location"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="period"
            >
              Period of Quarter
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="period"
              type="text"
              name="period"
              placeholder="Enter your Period of Quarter"
            />
          </div>
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
              type="text"
              name="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="employeeCode"
            >
              Employee Code
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeCode"
              type="text"
              name="employeeCode"
              placeholder="Enter your Employee Code"
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
              type="text"
              name="designation"
              placeholder="Enter your Designation"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              name="department"
              placeholder="Enter your Department"
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
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <Field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="date"
              type="date"
              placeholder="Select a date"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <Field
              as={"select"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="">Select a Service</option>
              <option value="water">Water Supply</option>
              <option value="electric">Electric Connection</option>
              <option value="seawage">Sewerage Line</option>
              <option value="civil">Civil Work</option>
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
              rows={4}
              name="message"
              placeholder="Enter any additional information"
              defaultValue={""}
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Request Maintenance
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Maintenance;
