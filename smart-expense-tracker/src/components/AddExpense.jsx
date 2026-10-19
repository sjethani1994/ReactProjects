import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/AddExpense.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showSuccess, showError } from "../utils/toast";

const AddExpense = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const isViewMode = mode === "view";

  useEffect(() => {
    if (id) {
      fetchExpense();
    }
  }, [id]);

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/expenses/${id}`);
      reset(response.data);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      amount: "",
      category: "",
      date: "",
      paymentMethod: "",
      description: "",
    },
  });

  const addExpense = async (data) => {
    try {
      const response = axios.post("http://localhost:3001/expenses", data);
      showSuccess("Expense added successfully!");
      navigate("/");
      reset();
    } catch (error) {
      showError(
        error.response?.data?.message ||
          "Failed to add expense. Please try again.",
      );
    }
  };

  const updateExpense = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/expenses/${id}`,
        formData,
      );
      showSuccess("Expense updated successfully!");
      navigate("/");
      reset();
    } catch (error) {
      showError(
        error.response?.data?.message ||
          "Failed to update expense. Please try again.",
      );
    }
  };

  return (
    <div className="add-expense-page">
      <div className="add-expense-heading">
        <h1>Add New Expense</h1>
        <p>Record your spending and keep your finances organized.</p>
      </div>

      <div className="expense-form-card">
        <div className="form-card-heading">
          <div className="form-heading-icon">₹</div>
          <div>
            <h2>Expense Details</h2>
            <p>Enter the details of your transaction below.</p>
          </div>
        </div>

        <form
          className="expense-form"
          onSubmit={handleSubmit(mode === "edit" ? updateExpense : addExpense)}
          noValidate
        >
          <div className="form-grid">
            {/* Expense Title */}
            <div className="form-group">
              <label htmlFor="title">Expense Title *</label>

              <input
                type="text"
                id="title"
                placeholder="e.g. Grocery Shopping"
                maxLength={50}
                className={errors.title ? "input-error" : ""}
                aria-invalid={!!errors.title}
                disabled={isViewMode}
                aria-describedby={errors.title ? "title-error" : undefined}
                {...register("title", {
                  required: "Expense title is required.",
                  minLength: {
                    value: 3,
                    message: "Title must contain at least 3 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Title cannot exceed 50 characters.",
                  },
                  validate: {
                    notBlank: (value) =>
                      value.trim().length > 0 ||
                      "Title cannot contain only spaces.",
                  },
                })}
              />

              {errors.title && (
                <span id="title-error" className="field-error">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amount">Amount (₹) *</label>

              <input
                type="number"
                id="amount"
                placeholder="e.g. 1250"
                min="0.01"
                max="100000000"
                step="0.01"
                disabled={isViewMode}
                className={errors.amount ? "input-error" : ""}
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? "amount-error" : undefined}
                {...register("amount", {
                  required: "Expense amount is required.",
                  valueAsNumber: true,
                  validate: {
                    validNumber: (value) =>
                      (Number.isFinite(value) && value > 0) ||
                      "Amount must be greater than zero.",
                    maxAmount: (value) =>
                      value <= 100000000 || "Amount exceeds the allowed limit.",
                    maxDecimals: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(String(value)) ||
                      "Amount can have at most 2 decimal places.",
                  },
                })}
              />

              {errors.amount && (
                <span id="amount-error" className="field-error">
                  {errors.amount.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category *</label>

              <select
                id="category"
                className={errors.category ? "input-error" : ""}
                aria-invalid={!!errors.category}
                disabled={isViewMode}
                {...register("category", {
                  required: "Please select a category.",
                  validate: (value) =>
                    [
                      "Food",
                      "Travel",
                      "Shopping",
                      "Bills",
                      "Health",
                      "Entertainment",
                      "Education",
                      "Other",
                    ].includes(value) || "Please select a valid category.",
                })}
              >
                <option value="">Select category</option>
                <option value="Food">Food & Dining</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills & Utilities</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>

              {errors.category && (
                <span className="field-error">{errors.category.message}</span>
              )}
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">Expense Date *</label>

              <input
                type="date"
                id="date"
                max={new Date().toLocaleDateString("en-CA")}
                className={errors.date ? "input-error" : ""}
                aria-invalid={!!errors.date}
                disabled={isViewMode}
                {...register("date", {
                  required: "Expense date is required.",
                  validate: {
                    notFuture: (value) =>
                      value <= new Date().toLocaleDateString("en-CA") ||
                      "Expense date cannot be in the future.",
                  },
                })}
              />

              {errors.date && (
                <span className="field-error">{errors.date.message}</span>
              )}
            </div>

            {/* Payment Method */}
            <div className="form-group full-width">
              <label htmlFor="paymentMethod">Payment Method *</label>

              <select
                id="paymentMethod"
                className={errors.paymentMethod ? "input-error" : ""}
                aria-invalid={!!errors.paymentMethod}
                disabled={isViewMode}
                {...register("paymentMethod", {
                  required: "Please select a payment method.",
                  validate: (value) =>
                    [
                      "Cash",
                      "UPI",
                      "Credit Card",
                      "Debit Card",
                      "Net Banking",
                      "Other",
                    ].includes(value) ||
                    "Please select a valid payment method.",
                })}
              >
                <option value="">Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Other">Other</option>
              </select>

              {errors.paymentMethod && (
                <span className="field-error">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>

            {/* Notes */}
            <div className="form-group full-width">
              <label htmlFor="description">Notes (Optional)</label>

              <textarea
                id="description"
                rows="4"
                placeholder="Add additional details about this expense..."
                maxLength={250}
                disabled={isViewMode}
                className={errors.description ? "input-error" : ""}
                {...register("description", {
                  maxLength: {
                    value: 250,
                    message: "Description cannot exceed 250 characters.",
                  },
                })}
              />

              {errors.description && (
                <span className="field-error">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-required-note">* Required fields</div>

          <div className="form-actions">
            <Link to="/" className="cancel-btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="save-expense-btn"
              disabled={isViewMode}
            >
              {mode === "edit" ? "Update Expense" : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
