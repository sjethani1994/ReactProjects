import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../services/employeeService";

// ---------- Thunks (async actions that call the service) ----------

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    return await getAllEmployees();
  },
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee) => {
    return await addEmployee(employee);
  },
);

export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async (employee) => {
    return await updateEmployee(employee);
  },
);

export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id, { rejectWithValue }) => {
    const employee = await getEmployee(id);
    if (!employee) {
      return rejectWithValue("Employee not found");
    }
    return employee;
  },
);

export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteEmployeeById",
  async (id, { dispatch }) => {
    await deleteEmployee(id);
    dispatch(fetchEmployees()); // reload the list after deleting
    return id;
  },
);

// ---------- Slice ----------

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [], // the list page
    selectedEmployee: null, // the view / edit page
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
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

      // Get one
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEmployee = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        // payload = our "Employee not found"; error = anything unexpected
        state.error = action.payload ?? action.error.message;
      })

      // Delete
      .addCase(deleteEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
