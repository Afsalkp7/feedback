import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/user/Home'
import Layout from './components/layout/Layout';

function App() {

  return (
    <>
    <div className=" h-screen bg-blue-100 ">
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
                <h1>helo</h1>
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
