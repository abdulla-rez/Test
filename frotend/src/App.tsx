import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SalesPage from "./pages/Sales";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sale" element={<SalesPage />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
