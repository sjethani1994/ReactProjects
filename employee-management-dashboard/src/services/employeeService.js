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

// Firestore returns createdAt as a Timestamp object, which Redux can't store
// (not serializable). Convert every document to plain data with an ISO string.
const toEmployee = (snapshot) => {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
  };
};

export const getAllEmployees = async () => {
  const employeeCollection = collection(db, "employees");
  const response = await getDocs(employeeCollection);

  return response.docs.map(toEmployee);
};

export const getEmployee = async (employeeId) => {
  const employeeRef = doc(db, "employees", employeeId);
  const response = await getDoc(employeeRef);

  return response.exists() ? toEmployee(response) : null;
};

export const deleteEmployee = async (employeeId) => {
  const employeeRef = doc(db, "employees", employeeId);
  // deleteDoc resolves with nothing (void) — there's no snapshot to read.
  // If it doesn't throw, the delete worked, so just return the id.
  await deleteDoc(employeeRef);

  return employeeId;
};

export const addEmployee = async (employeeData) => {
  const employeeCollection = collection(db, "employees");

  // serverTimestamp() = Firestore sets the time on its server (correct even if
  // the user's clock is wrong). Saved as a Timestamp, like existing docs.
  const response = await addDoc(employeeCollection, {
    ...employeeData,
    createdAt: serverTimestamp(),
  });

  // Return plain data for Redux (string, not Date/Timestamp)
  return {
    id: response.id,
    ...employeeData,
    createdAt: new Date().toISOString(),
  };
};
