import { useState } from 'react'
import { Menu, X, FileText, CheckCircle, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react'

function LeverancierPortaal() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('openstaande-transacties')

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

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'openstaande-transacties':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Openstaande transacties</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Hier komen je openstaande transacties te staan.</p>
            </div>
          </div>
        )
      case 'afgehandelde-transacties':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Afgehandelde transacties</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600">Hier komen je afgehandelde transacties te staan.</p>
            </div>
          </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Leveranciersportaal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welkom, [Gebruikersnaam]</span>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
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

export default LeverancierPortaal 