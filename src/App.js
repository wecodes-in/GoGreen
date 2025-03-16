import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import TreeTracker from "./pages/TreeTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={user ? <Donate /> : <Navigate to="/login" />} />
        <Route path="/tree-tracker" element={user ? <TreeTracker /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
