import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/user/Home";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/admin/Dashboard";
import FormBuilder from "./components/admin/FeedForm";
import AuthForm from "./components/user/AuthForm";
import PrivateRoute from "./components/user/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen bg-blue-100 bg-fixed">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<AuthForm />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                
                  <Dashboard />
                
              }
            />
            <Route
              path="/addFeed/:feedbackBoxName"
              element={
                
                  <FormBuilder />
                
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
