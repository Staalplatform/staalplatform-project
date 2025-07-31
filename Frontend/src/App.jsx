import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import AfnemersPortaal from './pages/AfnemersPortaal'
import LeverancierPortaal from './pages/LeverancierPortaal'
import EmailVerification from './pages/EmailVerification'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/afnemersportaal" element={<AfnemersPortaal />} />
        <Route path="/leverancierportaal" element={<LeverancierPortaal />} />
        <Route path="/verify/:token" element={<EmailVerification />} />
      </Routes>
    </Router>
  )
}

export default App 