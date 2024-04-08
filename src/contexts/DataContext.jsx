"use client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "@/firebase";

const { createContext, useContext, useEffect, useState } = require("react");

const DataContext = createContext({ bookings: [], reports: [] });

export function useData() {
  return useContext(DataContext);
}

const DataProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    (async () => {
      const admin = await isAdmin();
      console.log("isAdmin", admin);
      if (!admin) {
        onSnapshot(
          doc(db, `users/${currentUser.uid}`),
          async (userDocSnapshot) => {
            const userData = userDocSnapshot.data();
            console.log("userData", userData);
            const userBookingsDocSnapshots = await Promise.all(
              userData.bookings.map((b) => getDoc(doc(db, `bookings/${b}`)))
            );

            const userBookings = userBookingsDocSnapshots.map((d) => d.data());
            setBookings(userBookings);
            const userRepairsDocSnapshots = await Promise.all(
              userData.repairs.map((b) => getDoc(doc(db, `repairs/${b}`)))
            );

            const userRepairs = userRepairsDocSnapshots.map((d) => d.data());
            setBookings(userRepairs);
            console.log("userRepairs", userRepairs);
          }
        );
      } else {
        onSnapshot(collection(db, `bookings`), (snapshot) => {
          const allBookings = [];
          snapshot.docs.forEach(async (doc) => {
            allBookings.push(doc.data());
          });
          setBookings(allBookings);
        });
      }
    })();
  }, []);
  const value = { bookings, repairs };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
