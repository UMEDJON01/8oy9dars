// useCollection.js
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (collectionName && whereData) {
      const q = query(collection(db, collectionName), where(...whereData));
      onSnapshot(q, (querySnapshot) => {
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      });
    }
  }, [collectionName, whereData]);

  return { data };
};

export const useActionData = () => {
  const [actionData, setActionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/action");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return actionData;
};
