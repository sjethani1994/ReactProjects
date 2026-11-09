import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      {/* Scrollable Main Container */}
      <main className="fixed inset-x-0 top-16 bottom-12 overflow-y-auto px-6 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
