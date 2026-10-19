import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Pencil, Trash2, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [summaryInfo, setSummaryInfo] = useState({});
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/expenses");
    setExpenses(response.data);

    let totalExpense = 0;
    let thisMonthExpense = 0;
    let todaysExpense = 0;
    let totalTranscations = response.data.length;
    const date = new Date();

    response.data.forEach((expense) => {
      const amount = Number(expense.amount);
      const checkDate = new Date(expense.date);

      // Total expenses
      totalExpense += amount;

      // Current month's expenses
      if (
        date.getFullYear() === checkDate.getFullYear() &&
        date.getMonth() === checkDate.getMonth()
      ) {
        thisMonthExpense += amount;
      }

      // Today's expenses
      if (date.toDateString() === checkDate.toDateString()) {
        todaysExpense += amount;
      }
    });

    setSummaryInfo({
      totalExpense,
      thisMonthExpense,
      todaysExpense,
      totalTranscations,
    });
  };

  const handleEdit = (id) => {
    navigate(`/expenses/edit/${id}`);
  };

  const handleDelete = async (id) => {
    // Implement your Axios DELETE request here.
  };

  return (
    <div className="dashboard">
      <section className="summary-grid">
        <div className="summary-card">
          <div className="summary-card-top">
            <span className="summary-label">Total Expenses</span>
            <span className="summary-icon expense-icon">₹</span>
          </div>
          <h2>₹{summaryInfo.totalExpense}</h2>
          <p className="summary-description">Total recorded expenses</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <span className="summary-label">This Month</span>
            <span className="summary-icon month-icon">▦</span>
          </div>
          <h2>₹{summaryInfo.thisMonthExpense}</h2>
          <p className="summary-description">Expenses this month</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <span className="summary-label">Today's Expenses</span>
            <span className="summary-icon today-icon">◷</span>
          </div>
          <h2>₹{summaryInfo.todaysExpense}</h2>
          <p className="summary-description">Spent today</p>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <span className="summary-label">Total Transactions</span>
            <span className="summary-icon transaction-icon">↗</span>
          </div>
          <h2>{summaryInfo.totalTranscations}</h2>
          <p className="summary-description">Recorded transactions</p>
        </div>
      </section>

      {/* Recent Expenses */}
      <section className="recent-expenses">
        <div className="section-header">
          <div>
            <h2>Recent Expenses</h2>
            <p>Your latest transactions at a glance.</p>
          </div>

          <button
            className="view-all-btn"
            onClick={() => setViewAll((prev) => !prev)}
          >
            {viewAll ? "View Less" : "View All"}
          </button>
        </div>

        <div className="expense-table-wrapper">
          <table className="expense-table">
            <thead className="sticky top-0">
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th className="amount-column">Amount</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses
                .slice(0, viewAll ? expenses.length : 5)
                .map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <div className="expense-name">
                        <span className="expense-avatar food-avatar">
                          {expense.title.charAt(0)}
                        </span>
                        <span>{expense.title}</span>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge food-badge">
                        {expense.category}
                      </span>
                    </td>

                    <td>{expense.date}</td>
                    <td>{expense.paymentMethod}</td>

                    <td className="amount-column expense-amount">
                      ₹{expense.amount}
                    </td>

                    <td className="expense-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => navigate(`/expenses/view/${expense.id}`)}
                        title="View Expense"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        className="action-icon edit-action"
                        title="Edit expense"
                        aria-label="Edit expense"
                        onClick={() => handleEdit(expense.id)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        className="action-icon delete-action"
                        title="Delete expense"
                        aria-label="Delete expense"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
