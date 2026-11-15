import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase/fireBase";

const employeesCollection = collection(db, "employees");

// Firestore document → plain object for Redux.
// createdAt comes as a Firestore Timestamp, which Redux can't store, so make it a string.
const toEmployee = (document) => {
  const data = document.data();
  return {
    id: document.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
  };
};

export const getAllEmployees = async () => {
  const result = await getDocs(employeesCollection);
  return result.docs.map(toEmployee);
};

// Returns null if no employee has this id
export const getEmployee = async (id) => {
  const document = await getDoc(doc(db, "employees", id));
  return document.exists() ? toEmployee(document) : null;
};

export const addEmployee = async (employee) => {
  const newDocument = await addDoc(employeesCollection, {
    ...employee,
    createdAt: serverTimestamp(), // Firestore fills in the current time
  });

  return {
    id: newDocument.id,
    ...employee,
    createdAt: new Date().toISOString(),
  };
};

export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, "employees", id));
  return id;
};
