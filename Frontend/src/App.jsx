import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import AfnemersPortaal from './pages/AfnemersPortaal'
import LeverancierPortaal from './pages/LeverancierPortaal'
import EmailVerification from './pages/EmailVerification'
import NieuweTransactie from './pages/NieuweTransactie'
import './App.css'

// 404 Not Found component
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Pagina niet gevonden</p>
        <a 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Terug naar home
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/afnemersportaal" element={<AfnemersPortaal />} />
          <Route path="/leverancierportaal" element={<LeverancierPortaal />} />
          <Route path="/nieuwe-transactie" element={<NieuweTransactie />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App 