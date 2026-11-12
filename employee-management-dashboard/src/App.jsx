import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
