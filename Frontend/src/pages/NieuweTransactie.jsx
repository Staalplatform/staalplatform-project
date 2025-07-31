import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, Save, X } from 'lucide-react'

function NieuweTransactie() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    project_naam: '',
    project_beschrijving: '',
    gewenste_leverdatum: '',
    budget_range: '',
    materiaal_type: '',
    hoeveelheid: '',
    specificaties: '',
    bijzonderheden: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implementeer API call naar backend
      console.log('Nieuwe transactie data:', formData)
      
      // Simuleer API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect naar afnemersportaal na succes
      navigate('/afnemersportaal')
    } catch (error) {
      console.error('Fout bij aanmaken transactie:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/afnemersportaal')
  }

  // Redirect als gebruiker niet is ingelogd of verkeerd type
  if (!loading && (!user || user.user_type !== 'buyer')) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCancel}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Nieuwe Transactie</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Informatie</h2>
            <p className="text-gray-600">Vul de gegevens in voor je nieuwe transactie</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Basis Informatie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project naam *
                </label>
                <input
                  type="text"
                  name="project_naam"
                  value={formData.project_naam}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bijv. Staalconstructie voor magazijn"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewenste leverdatum *
                </label>
                <input
                  type="date"
                  name="gewenste_leverdatum"
                  value={formData.gewenste_leverdatum}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project beschrijving *
              </label>
              <textarea
                name="project_beschrijving"
                value={formData.project_beschrijving}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Beschrijf je project in detail..."
              />
            </div>

            {/* Materiaal Specificaties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materiaal type *
                </label>
                <select
                  name="materiaal_type"
                  value={formData.materiaal_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecteer materiaal</option>
                  <option value="staal">Staal</option>
                  <option value="roestvrij_staal">Roestvrij staal</option>
                  <option value="aluminium">Aluminium</option>
                  <option value="gietijzer">Gietijzer</option>
                  <option value="anders">Anders</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hoeveelheid *
                </label>
                <input
                  type="text"
                  name="hoeveelheid"
                  value={formData.hoeveelheid}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bijv. 1000 kg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget range
                </label>
                <select
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecteer budget</option>
                  <option value="0-5000">€0 - €5.000</option>
                  <option value="5000-10000">€5.000 - €10.000</option>
                  <option value="10000-25000">€10.000 - €25.000</option>
                  <option value="25000-50000">€25.000 - €50.000</option>
                  <option value="50000+">€50.000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technische specificaties
              </label>
              <textarea
                name="specificaties"
                value={formData.specificaties}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Technische specificaties, afmetingen, etc..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bijzonderheden
              </label>
              <textarea
                name="bijzonderheden"
                value={formData.bijzonderheden}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Extra opmerkingen, speciale wensen, etc..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
              >
                <X size={16} />
                <span>Annuleren</span>
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span>{isLoading ? 'Bezig met opslaan...' : 'Transactie aanmaken'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NieuweTransactie 