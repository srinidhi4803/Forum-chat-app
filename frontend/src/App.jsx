import './App.css'
import Register from './components/Register'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
