import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/fireBase";

const employeesCollection = collection(db, "employees");

// Firestore Timestamp → string (Redux can't store Timestamp objects).
// If it's already a string (older saved data), keep it as it is.
const toDateString = (value) =>
  typeof value?.toDate === "function"
    ? value.toDate().toISOString()
    : (value ?? null);

// Firestore document → plain object for Redux
const toEmployee = (document) => {
  const data = document.data();

  return {
    ...data,
    id: document.id, // after ...data, so a stray "id" field saved earlier can't override it
    createdAt: toDateString(data.createdAt),
    updatedAt: toDateString(data.updatedAt),
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

export const updateEmployee = async (employee) => {
  // Take id and createdAt out: id is the document's name (not a field),
  // and createdAt must never change when editing.
  // eslint-disable-next-line no-unused-vars
  const { id, createdAt, ...changes } = employee;

  await updateDoc(doc(db, "employees", id), {
    ...changes,
    updatedAt: serverTimestamp(),
  });

  return { ...employee, updatedAt: new Date().toISOString() };
};

export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, "employees", id));
  return id;
};
