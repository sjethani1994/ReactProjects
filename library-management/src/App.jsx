import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { LibraryProvider } from "./utils/libraryContext";

function App() {
  return (
    <LibraryProvider>
      <div className="app-layout">
        <Header />

        <main className="main-container">
          <Outlet />
        </main>

        <Footer />
      </div>
    </LibraryProvider>
  );
}

export default App;
