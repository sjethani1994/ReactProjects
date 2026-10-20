import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ThemeContextProvider from "./utils/ThemeContextProvider";
function App() {
  return (
    <ThemeContextProvider>
      <div className="app-layout">
        <Header />

        <main className="app-main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
