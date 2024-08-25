import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/user/Home'
import Layout from './components/layout/Layout';
import Dashboard from './components/admin/Dashboard';

function App() {

  return (
    <>
    <div className="min-h-screen bg-blue-100 bg-fixed">
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route
            path="/admin"
            element={
                <Dashboard />
            }
          />
        </Route>
      </Routes>
    </Router>
    </div>
    
    </>
  )
}

export default App
