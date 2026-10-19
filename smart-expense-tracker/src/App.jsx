import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  return (
    <>
      <div className="app-layout">
        <Header />

        <main className="app-main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
