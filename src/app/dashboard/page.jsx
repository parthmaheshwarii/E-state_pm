"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import { toast } from "react-toastify";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const { bookings, repairs } = useData();
  const { isAdmin, signOut, currentUser } = useAuth();
  function deleteBooking(bookingId) {}
  function deleteRepair(repairId) {}
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);
  async function onBookingAccept(bookingId) {
    await updateDoc(doc(db, `bookings/${bookingId}`), { status: "Accepted" });
    // emailjs
    //   .sendForm(
    //     "service_yoohhm2",
    //     "template_wouyxmq",
    //     formRef.current.target,
    //     "joFrbCbtiZNYGPbYS"
    //   )
    //   .then(
    //     (result) => {
    //       toast.success(`Mail sent successfully!`, {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       }); //This is if you still want the Contact to reload (since e.preventDefault() cancelled that behavior)
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
    toast.success(`Booking Accepted`, {
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
  async function onBookingReject(bookingId) {
    await updateDoc(doc(db, `bookings/${bookingId}`), { status: "Rejected" });
    toast.success(`Booking Rejected`, {
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
  async function onRepairAccept(bookingId) {
    await updateDoc(doc(db, `repairs/${bookingId}`), { status: "Accepted" });
  }
  async function onRepairReject(bookingId) {
    await updateDoc(doc(db, `repairs/${bookingId}`), { status: "Rejected" });
  }
  return (
    <div className="bg-orange-100 min-h-screen">
      {/* <div className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full">
        <div className="flex items-center justify-between py-2 text-5x1">
          <div className="font-bold text-blue-900 text-xl">
            Admin<span className="text-orange-600">Panel</span>
          </div>
          <div className="flex items-center text-gray-500">
            <span
              className="material-symbols-outlined p-2"
              style={{ fontSize: 30 }}
            >
              search
            </span>
            <span
              className="material-symbols-outlined p-2"
              style={{ fontSize: 30 }}
            >
              notifications
            </span>
            <div
              className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2"
              style={{
                backgroundImage:
                  "url(https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg)",
              }}
            />
          </div>
        </div>
      </div> */}
      <Tab.Group as="div" className="flex flex-row pt-24 px-10 pb-4">
        <Tab.List as="div" className="w-2/12 mr-6 ">
          <div className="bg-white rounded-xl shadow-lg mb-6 px-3 py-4">
            {isAdmin && (
              <Tab
                as="div"
                className="inline-block text-gray-600 hover:text-black my-4 w-full  focus:outline-none cursor-pointer"
              >
                <>
                  <span className="material-symbols-outlined float-left pr-2">
                    dashboard
                  </span>
                  Home
                  {/* <span className="material-symbols-outlined">arrow_drop_down</span> */}
                  <span className="material-symbols-outlined float-right ">
                    chevron_right
                  </span>
                </>
              </Tab>
            )}
            <Tab
              as="div"
              className="inline-block text-gray-600 hover:text-black my-4 w-full  focus:outline-none cursor-pointer"
            >
              <>
                <span className="material-symbols-outlined float-left pr-2">
                  tune
                </span>
                Bookings
                <span className="material-symbols-outlined float-right">
                  keyboard_arrow_right
                </span>
              </>
            </Tab>
            <Tab
              as="div"
              className="inline-block text-gray-600 hover:text-black my-4 w-full  focus:outline-none cursor-pointer"
            >
              <>
                <span className="material-symbols-outlined float-left pr-2">
                  file_copy
                </span>
                Maintenance
                <span className="material-symbols-outlined float-right">
                  keyboard_arrow_right
                </span>
              </>
            </Tab>
            <Tab
              as="div"
              className="inline-block text-gray-600 hover:text-black my-4 w-full focus:outline-none cursor-pointer"
            >
              <>
                <span className="material-symbols-outlined float-left pr-2">
                  comment
                </span>
                Feedbacks
                <span className="material-symbols-outlined float-right">
                  keyboard_arrow_right
                </span>
              </>
            </Tab>
          </div>
          <div className="bg-white rounded-xl shadow-lg mb-6 px-3 py-4">
            <Tab
              as="div"
              className="inline-block text-gray-600 hover:text-black my-4 w-full focus:outline-none cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              <span className="material-symbols-outlined float-left pr-2">
                power_settings_new
              </span>
              Log out
              <span className="material-symbols-outlined float-right">
                keyboard_arrow_right
              </span>
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels className="w-full">
          {isAdmin && (
            <Tab.Panel className="w-10/12">
              <div className="flex flex-row">
                <div
                  className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6"
                  style={{
                    backgroundImage:
                      "url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5)",
                    backgroundPosition: "90% center",
                  }}
                >
                  <p className="text-3xl text-indigo-900">
                    <strong>Bookings Pending</strong>
                  </p>
                  <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
                    <strong>5</strong>
                  </span>
                </div>
                <div
                  className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6"
                  style={{
                    backgroundImage:
                      "url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5)",
                    backgroundPosition: "100% 40%",
                  }}
                >
                  <p className="text-3xl text-indigo-900">
                    <strong>Maintenance Pending</strong>
                  </p>
                  <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2">
                    <strong>2</strong>
                  </span>
                  {/* <a
                  href=""
                  className="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"
                >
                  <strong>See all</strong>
                </a> */}
                </div>
              </div>
              {/* <div className="flex flex-row h-64 mt-6">
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                  a
                </div>
                <div className="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12">
                  b
                </div>
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                  c
                </div>
              </div> */}
            </Tab.Panel>
          )}

          <Tab.Panel className="w-10/12">
            <div className="flex flex-row min-h-64 mt-6">
              <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-8/12">
                <h2 className="text-2xl text-center">Bookings</h2>

                <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                  {bookings.length ? (
                    bookings.map((b, i) => (
                      <Disclosure as="li" key={i}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              as="div"
                              className="px-4 py-5 sm:px-6"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  {b.name}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  {b.bookingBy}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                  Status:{" "}
                                  <span
                                    className={
                                      b.status === "Accepted"
                                        ? "text-green-600"
                                        : b.status == "Rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }
                                  >
                                    {b.status}
                                  </span>
                                </p>
                                <span
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-purple-500 material-symbols-outlined float-right hover:cursor-pointer`}
                                >
                                  keyboard_arrow_up
                                </span>
                              </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                              <div className="">
                                <p>Location: {b.location}</p>
                                <p>Phone: {b.phone}</p>
                                <p>CollegeID: {b.collegeId}</p>
                                <p>Designation: {b.designation}</p>
                                <p>To Date: {b.toDate}</p>
                                <p>From Date: {b.fromDate}</p>
                                <p>Time: {b.timeRange}</p>
                              </div>
                              <div className="flex">
                                <p>{b.message}</p>
                                {b.status == "Pending" && !isAdmin && (
                                  <button
                                    onClick={() => {
                                      deleteBooking(b.id);
                                    }}
                                    className="px-8"
                                  >
                                    <span className="material-symbols-outlined text-red-700 float-right">
                                      delete
                                    </span>
                                  </button>
                                )}
                              </div>
                              {b.status == "Pending" && isAdmin && (
                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      onBookingAccept(b.id);
                                    }}
                                    className="p-2 text-white flex-1 m-2 bg-green-700 border rounded"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => {
                                      onBookingReject(b.id);
                                    }}
                                    className="p-2 text-white flex-1 m-2 bg-red-700 border rounded"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))
                  ) : (
                    <div className="flex flex-1 justify-center items-center p-20">
                      No Bookings
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="w-10/12">
            <div className="flex flex-row min-h-64 mt-6">
              <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-8/12">
                <h2 className="text-2xl text-center"> Maintenance</h2>
                <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                  {repairs.length ? (
                    repairs.map((b, i) => (
                      <Disclosure as="li" key={i}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              as="div"
                              className="px-4 py-5 sm:px-6"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                  {b.name}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  {b.requestBy}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                  Status:{" "}
                                  <span
                                    className={
                                      b.status === "Accepted"
                                        ? "text-green-600"
                                        : b.status == "Rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }
                                  >
                                    {b.status}
                                  </span>
                                </p>
                                <span
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-purple-500 material-symbols-outlined hover:cursor-pointer float-right`}
                                >
                                  keyboard_arrow_up
                                </span>
                              </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                              <div className="">
                                <p>Quarter No. {b.quarterNo}</p>
                                <p>Phone {b.phone}</p>
                                <p>Quarter Period {b.period}</p>
                                <p>Location: {b.location}</p>
                                <p>Service: {b.service}</p>
                                <p>Employee Code: {b.employeeCode}</p>
                                <p>Designation: {b.designation}</p>
                                <p>Department: {b.department}</p>
                              </div>
                              <div className="flex">
                                <p>{b.message}</p>
                                {b.status == "Pending" && !isAdmin && (
                                  <button
                                    onClick={() => {
                                      deleteRepair(b.id);
                                    }}
                                    className="px-8"
                                  >
                                    <span className="material-symbols-outlined text-red-700 float-right">
                                      delete
                                    </span>
                                  </button>
                                )}
                              </div>
                              {b.status == "Pending" && isAdmin && (
                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      onRepairAccept(b.id);
                                    }}
                                    className="p-2 text-white flex-1 m-2 bg-green-700 border rounded"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => {
                                      onRepairReject(b.id);
                                    }}
                                    className="p-2 text-white flex-1 m-2 bg-red-700 border rounded"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))
                  ) : (
                    <div className="flex flex-1 justify-center items-center h-full">
                      No Maintenance Requests
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Dashboard;
