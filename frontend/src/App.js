import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Default from "./pages/Default";
import Admin from "./layouts/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Default />} />
    </Routes>
  );
}

export default App;
