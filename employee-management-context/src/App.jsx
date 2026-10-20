import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <EmployeeProvider>
      <div className="app-layout">
        <Header />

        <main className="app-main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </EmployeeProvider>
  );
}

export default App;
