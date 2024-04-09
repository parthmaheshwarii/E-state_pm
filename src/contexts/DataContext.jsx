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
  const { isAdmin, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      if (!isAdmin) {
        onSnapshot(
          doc(db, `users/${currentUser.uid}`),
          async (userDocSnapshot) => {
            const userData = userDocSnapshot.data();
            console.log("userData", userData);
            const userBookingsDocSnapshots = await Promise.all(
              userData.bookings.map((b) => getDoc(doc(db, `bookings/${b}`)))
            );

            const userBookings = userBookingsDocSnapshots.map((d) => ({
              ...d.data(),
              id: d.id,
            }));
            setBookings(userBookings);
            const userRepairsDocSnapshots = await Promise.all(
              userData.repairs.map((b) => getDoc(doc(db, `repairs/${b}`)))
            );

            const userRepairs = userRepairsDocSnapshots.map((d) => ({
              ...d.data(),
              id: d.id,
            }));
            setRepairs(userRepairs);
            console.log("userRepairs", userRepairs);
          }
        );
      } else {
        onSnapshot(collection(db, `bookings`), (snapshot) => {
          const allBookings = [];
          snapshot.docs.forEach(async (doc) => {
            allBookings.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setBookings(allBookings);
        });
        onSnapshot(collection(db, `repairs`), (snapshot) => {
          const allRepairs = [];
          snapshot.docs.forEach(async (doc) => {
            allRepairs.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setRepairs(allRepairs);
        });
      }
    }
  }, [currentUser]);
  const value = { bookings, repairs };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
