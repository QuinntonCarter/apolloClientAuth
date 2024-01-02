import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage";
import Navbar from "./components/navbar";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
