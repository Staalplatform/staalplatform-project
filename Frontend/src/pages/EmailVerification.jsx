import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

function EmailVerification() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // 'loading', 'success', 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/verify/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(data.message)
          // Na 3 seconden doorsturen naar homepage
          setTimeout(() => {
            navigate('/')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.error || 'Er is een fout opgetreden bij het verifiëren van je email.')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Er is een fout opgetreden bij het verifiëren van je email.')
      }
    }

    if (token) {
      verifyEmail()
    }
  }, [token, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Staalplatform</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Verificatie</h2>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {status === 'loading' && (
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Je email wordt geverifieerd...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verificatie Succesvol!</h3>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">U wordt doorgestuurd naar de homepage...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verificatie Mislukt</h3>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Terug naar Homepage
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification 