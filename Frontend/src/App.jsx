import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Staalplatform</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Staalplatform
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              De slimme manier om staal in te kopen
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Bedrijven die grote hoeveelheden staal inkopen, doen dat vaak via hun bekende kanalen. 
              Dit zijn vaak niet de beste en goedkoopste kanalen, en met name niet als een afnemer bij een Nederlandse leverancier bestelt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:ring-blue-500 shadow-sm transform hover:-translate-y-0.5">
                Start met besparen
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:shadow-lg focus:ring-white transform hover:-translate-y-0.5">
                Meer informatie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor ons platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ontdek de voordelen van het Staalplatform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 bg-green-100 text-green-800">
                💰
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lagere prijs</h3>
              <p className="text-gray-600 leading-relaxed">
                Bespaar aanzienlijk op uw staal aankopen door directe connecties met internationale leveranciers
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 bg-blue-100 text-blue-800">
                🌍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Knowhow om te importeren</h3>
              <p className="text-gray-600 leading-relaxed">
                Onze expertise in internationale import zorgt voor soepele transacties en compliance
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 bg-purple-100 text-purple-800">
                ✅
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Juiste certificaten</h3>
              <p className="text-gray-600 leading-relaxed">
                Alle leveranciers voldoen aan de vereiste certificeringen en kwaliteitsstandaarden
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 bg-orange-100 text-orange-800">
                🏗️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gelijkwaardige kwaliteit</h3>
              <p className="text-gray-600 leading-relaxed">
                Staal van dezelfde hoge kwaliteit als Nederlandse leveranciers, maar tegen betere prijzen
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 bg-red-100 text-red-800">
                🚚
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Snelle levering</h3>
              <p className="text-gray-600 leading-relaxed">
                Geoptimaliseerde logistiek voor tijdige levering van uw staal orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Klaar om te besparen?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start vandaag nog met het plaatsen van uw eerste opdracht
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:ring-blue-500 shadow-sm transform hover:-translate-y-0.5">
                Registreren
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 text-base rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:shadow-lg focus:ring-white transform hover:-translate-y-0.5">
                Contact opnemen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Staalplatform</span>
              </div>
              <p className="text-gray-400">
                De slimme manier om staal in te kopen
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Opdrachten</li>
                <li>Leveranciers</li>
                <li>Prijzen</li>
                <li>Kwaliteit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Documentatie</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bedrijf</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Over ons</li>
                <li>Privacy</li>
                <li>Voorwaarden</li>
                <li>Vacatures</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Staalplatform. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App 