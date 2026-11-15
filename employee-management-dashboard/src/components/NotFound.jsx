import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 text-center">
      <p className="text-6xl font-bold text-blue-600">404</p>
      <h1 className="text-2xl font-bold text-slate-800 mt-4">Page not found</h1>
      <p className="text-sm text-slate-500 mt-2">
        The page you are looking for doesn't exist.
      </p>
      <Link
        to="/employees"
        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
      >
        Back to Employees
      </Link>
    </div>
  );
};

export default NotFound;
