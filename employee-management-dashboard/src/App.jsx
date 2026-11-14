import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 min-h-0 overflow-y-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;
