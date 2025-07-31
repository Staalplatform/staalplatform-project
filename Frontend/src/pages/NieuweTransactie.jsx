import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react'

function NieuweTransactie() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [activeMenuItem, setActiveMenuItem] = useState('order-aanmaken')

  // Status workflow stappen
  const statusSteps = [
    'Order aangemaakt',
    'Order verzonden',
    'Order geopend door leverancier',
    'Voorstel leverancier ontvangen',
    'Definitieve order verzonden',
    'Definitief voorstel ontvangen',
    'Voorstel akkoord'
  ]

  // Dummy transactie data met status
  const dummyTransaction = {
    dossiernummer: 'Dossier89229',
    klantNaam: 'Steelmatics B.V.',
    datumIngediend: '31 juli 2025',
    laatsteWijziging: '05 augustus 2025',
    soortWijziging: 'Voorstel leverancier ontvangen',
    status: [1, 1, 1, 1, 2, 0, 0] // 0 = rood, 1 = groen, 2 = oranje
  }

  // Status icoontjes component
  const StatusIcons = ({ statusArray }) => {
    return (
      <div className="flex flex-col space-y-1">
        {statusArray.map((status, index) => (
          <div key={index} className="flex items-center space-x-2">
            {status === 0 && <XCircle size={14} className="text-red-500" />}
            {status === 1 && <CheckCircle2 size={14} className="text-green-500" />}
            {status === 2 && <Clock size={14} className="text-orange-500" />}
            <span className="text-xs text-gray-600">{statusSteps[index]}</span>
          </div>
        ))}
      </div>
    )
  }

  // Menu items voor de 7 statussen
  const menuItems = [
    {
      id: 'order-aanmaken',
      label: 'Order aanmaken',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'samenvatting-order',
      label: 'Samenvatting order en verzenden',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'order-geopend',
      label: 'Order geopend door leverancier',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'voorstel-leverancier',
      label: 'Voorstel leverancier',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'order-definitief',
      label: 'Order definitief maken en verzenden',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'definitief-voorstel',
      label: 'Definitief voorstel',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'overeenkomst-sluiten',
      label: 'Overeenkomst sluiten',
      icon: FileText,
      color: 'text-blue-600'
    }
  ]

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'order-aanmaken':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order aanmaken</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'samenvatting-order':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Samenvatting order en verzenden</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'order-geopend':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order geopend door leverancier</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'voorstel-leverancier':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Voorstel leverancier</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'order-definitief':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order definitief maken en verzenden</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'definitief-voorstel':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Definitief voorstel</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      case 'overeenkomst-sluiten':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overeenkomst sluiten</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Deze pagina wordt binnenkort geïmplementeerd.</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Welkom bij Nieuwe Transactie</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Selecteer een optie uit het menu om te beginnen.</p>
            </div>
          </div>
        )
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="flex flex-col h-full">
            {/* Sidebar header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Transactie Stappen</h2>
            </div>

            {/* Menu items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenuItem(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeMenuItem === item.id 
                        ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon size={20} className={activeMenuItem === item.id ? 'text-blue-600' : item.color} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Status overzicht */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Status Overzicht</h3>
              <StatusIcons statusArray={dummyTransaction.status} />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="bg-gray-50 min-h-screen">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default NieuweTransactie 