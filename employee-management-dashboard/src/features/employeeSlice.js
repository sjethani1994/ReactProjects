import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
} from "../services/employeeService";

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

export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    const employee = await getEmployee(employeeId);

    // getEmployee returns null for a bad id → treat it as an error, not success
    if (!employee) {
      return rejectWithValue("Employee not found");
    }

    return employee;
  },
);

export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteEmployeeById",
  async (employeeId, { dispatch }) => {
    // deleteEmployee returns the id. If Firestore fails it throws,
    // and createAsyncThunk turns that into the "rejected" action for us.
    const deletedId = await deleteEmployee(employeeId);

    // Reload the list so the table matches the database.
    // A thunk can dispatch other thunks — like chaining in an NgRx effect.
    dispatch(fetchEmployees());

    return deletedId;
  },
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    selectedEmployee: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Call when leaving the form so the next visit doesn't show stale data
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.error = null;
    },
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
      })

      //getEmployeeById
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEmployee = null; // drop the previous employee while the new one loads
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedEmployee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        // action.payload = our rejectWithValue message; action.error = unexpected (network etc.)
        state.error = action.payload ?? action.error.message;
      })

      // Delete employee
      .addCase(deleteEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeById.fulfilled, (state) => {
        // The list itself is replaced by fetchEmployees.fulfilled
        state.loading = false;
      })
      .addCase(deleteEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
