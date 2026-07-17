import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameBoard from "./pages/GameBoard";
import QuestionPage from "./pages/QuestionPage";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CategorySelection from "./pages/CategorySelection";
import MatchSetup from "./pages/MatchSetup";
import WinnerPage from "./pages/WinnerPage";
import MyAccount from "./pages/MyAccount";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/admin-login"
  element={<AdminLogin />}
/>
        <Route path="/admin" element={<Admin />} />
        <Route
  path="/winner"
  element={
    <ProtectedRoute>
      <WinnerPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/question"
  element={
    <ProtectedRoute>
      <QuestionPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/game"
  element={
    <ProtectedRoute>
      <GameBoard />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Home />} />
       <Route
  path="/categories"
  element={
    <ProtectedRoute>
      <CategorySelection />
    </ProtectedRoute>
  }
/>
<Route
  path="/account"
  element={
    <ProtectedRoute>
      <MyAccount />
    </ProtectedRoute>
  }
/>
        <Route
  path="/setup"
  element={
    <ProtectedRoute>
      <MatchSetup />
    </ProtectedRoute>
  }
/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;