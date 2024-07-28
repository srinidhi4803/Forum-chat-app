import './App.css'
import Register from './components/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { PrivateRoute } from './utils/PrivateRoute'
import Welcome from './components/Welcome'

function App() {
  return (  
      <Router>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            }
          />
          <Route path='/welcome' element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      
   
  )
}

export default App
