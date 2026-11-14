import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/fireBase";
export const getAllEmployees = async () => {
  const employeeCollection = collection(db, "employees");
  const response = await getDocs(employeeCollection);

  return response.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const addEmployee = async (employeeData) => {
  const employeeCollection = collection(db, "employees");

  const response = await addDoc(employeeCollection, employeeData);

  return {
    id: response.id,
    ...employeeData,
  };
};
