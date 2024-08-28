import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/user/Home";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/admin/Dashboard";
import FormBuilder from "./components/admin/FeedForm";
import AuthForm from "./components/user/AuthForm";
import PrivateRoute from "./components/user/PrivateRoute";
import Feed from "./components/user/Feed";

function App() {
  const fieldsArray = [
    { fieldType: "SingleLineInput", label: "Name" },
    { fieldType: "TextArea", label: "Description" },
    { fieldType: "NumericalRating", label: "Rating" },
    {
      fieldType: "RadioButtons",
      label: "Options",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];
  
  
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
              path="/feed"
              element={
                <PrivateRoute>
                  <Feed fields={fieldsArray}/>
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
