import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, FileText, CheckCircle, Settings, Users, ChevronLeft, ChevronRight, XCircle, Clock, CheckCircle2 } from 'lucide-react'

function AfnemersPortaal() {
  const navigate = useNavigate()
  const { user, logout, loading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('openstaande-transacties')

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

  // Dummy transactie data
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

  // Redirect als gebruiker niet is ingelogd of verkeerd type
  useEffect(() => {
    if (!loading && (!user || user.user_type !== 'buyer')) {
      navigate('/')
    }
  }, [user, loading, navigate])

  const menuItems = [
    {
      id: 'openstaande-transacties',
      label: 'Openstaande transacties',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'afgehandelde-transacties',
      label: 'Afgehandelde transacties',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 'accountinstellingen',
      label: 'Accountinstellingen',
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      id: 'gebruikersinstellingen',
      label: 'Gebruikersinstellingen',
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }



  // Transactie tabel component
  const TransactionTable = ({ transactions, title }) => {
    return (
      <div className="p-6">
                    <div className="mb-6">
              <div className="flex items-center space-x-6 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                {title === "Openstaande transacties" && (
                  <button
                    onClick={() => navigate('/nieuwe-transactie')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start nieuwe transactie
                  </button>
                )}
              </div>
            </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dossiernummer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Naam klant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum ingediend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Laatste wijziging
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Soort wijziging
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.dossiernummer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.klantNaam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.datumIngediend}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.laatsteWijziging}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.soortWijziging}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusIcons statusArray={transaction.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'openstaande-transacties':
        return (
          <TransactionTable 
            transactions={[dummyTransaction]} 
            title="Openstaande transacties" 
          />
        )
      case 'afgehandelde-transacties':
        return (
          <TransactionTable 
            transactions={[]} 
            title="Afgehandelde transacties" 
          />
        )
      case 'accountinstellingen':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accountinstellingen</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Hier kun je je accountinstellingen beheren.</p>
            </div>
          </div>
        )
      case 'gebruikersinstellingen':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gebruikersinstellingen</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Hier kun je je gebruikersinstellingen beheren.</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Afnemersportaal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/nieuwe-transactie')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start nieuwe transactie
              </button>
              <span className="text-sm text-gray-600">Welkom, {user?.first_name || 'Gebruiker'}</span>
              <button 
                onClick={logout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            </div>

            {/* Menu items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenuItem(item.id)
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 1024) {
                        setIsSidebarOpen(false)
                      }
                    }}
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

            {/* Sidebar footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                Staalplatform v1.0
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

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

export default AfnemersPortaal 