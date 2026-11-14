import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEmployee, getAllEmployees } from "../services/employeeService";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const employees = await getAllEmployees();
    return employees;
  },
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData) => {
    const response = await addEmployee(employeeData);
    return response;
  },
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default employeeSlice.reducer;
