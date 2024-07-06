import './App.css'
import Register from './components/Register'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'


function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
