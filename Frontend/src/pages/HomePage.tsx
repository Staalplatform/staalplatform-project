import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import LanguageSwitcher from '../components/LanguageSwitcher'

const HomePage = () => {
  const { t } = useTranslation()

  const benefits = [
    {
      key: 'lowerPrice',
      icon: '💰',
      color: 'bg-green-100 text-green-800'
    },
    {
      key: 'knowhow',
      icon: '🌍',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      key: 'certificates',
      icon: '✅',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      key: 'quality',
      icon: '🏗️',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      key: 'delivery',
      icon: '🚚',
      color: 'bg-red-100 text-red-800'
    }
  ]

  const features = [
    {
      key: 'orderManagement',
      icon: '📋',
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      key: 'supplierNetwork',
      icon: '🌐',
      color: 'bg-teal-100 text-teal-800'
    },
    {
      key: 'priceComparison',
      icon: '⚖️',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      key: 'qualityAssurance',
      icon: '🔍',
      color: 'bg-pink-100 text-pink-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Staalplatform</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('homepage.hero.title')}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t('homepage.hero.subtitle')}
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('homepage.hero.cta')}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                {t('homepage.hero.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('homepage.benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('homepage.benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.key} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-6 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t(`homepage.benefits.items.${benefit.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`homepage.benefits.items.${benefit.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('homepage.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('homepage.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.key} className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t(`homepage.features.items.${feature.key}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`homepage.features.items.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('homepage.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('homepage.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('homepage.cta.register')}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                {t('homepage.cta.contact')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
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

export default HomePage 