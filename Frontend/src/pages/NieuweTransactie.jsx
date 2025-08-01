import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, FileText, CheckCircle2, XCircle, Clock, Upload, X } from 'lucide-react'

function NieuweTransactie() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [activeMenuItem, setActiveMenuItem] = useState('order-aanmaken')
  
  // Form state
  const [formData, setFormData] = useState({
    dossiernummer: '',
    gewenste_leverdatum: '',
    contactpersoon: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
    telefoonnummer: user?.phone || ''
  })
  
  // File upload state
  const [files, setFiles] = useState({
    tekeningen: [],
    '3d_bestanden': [],
    stuklijsten: [],
    conservering: []
  })
  
  const [uploading, setUploading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  // Menu items voor de 7 statussen met status icoontjes
  const menuItems = [
    {
      id: 'order-aanmaken',
      label: 'Order aanmaken',
      status: 1 // Groen vinkje
    },
    {
      id: 'samenvatting-order',
      label: 'Samenvatting order en verzenden',
      status: 1 // Groen vinkje
    },
    {
      id: 'order-geopend',
      label: 'Order geopend door leverancier',
      status: 1 // Groen vinkje
    },
    {
      id: 'voorstel-leverancier',
      label: 'Voorstel leverancier',
      status: 1 // Groen vinkje
    },
    {
      id: 'order-definitief',
      label: 'Order definitief maken en verzenden',
      status: 2 // Oranje pending
    },
    {
      id: 'definitief-voorstel',
      label: 'Definitief voorstel',
      status: 0 // Rood kruisje
    },
    {
      id: 'overeenkomst-sluiten',
      label: 'Overeenkomst sluiten',
      status: 0 // Rood kruisje
    }
  ]

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'order-aanmaken':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order aanmaken</h2>
            
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Basis informatie */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dossiernummer *
                  </label>
                  <input
                    type="text"
                    name="dossiernummer"
                    value={formData.dossiernummer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Voer dossiernummer in"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gewenste leverdatum
                  </label>
                  <input
                    type="date"
                    name="gewenste_leverdatum"
                    value={formData.gewenste_leverdatum}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contactpersoon
                  </label>
                  <input
                    type="text"
                    name="contactpersoon"
                    value={formData.contactpersoon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    name="telefoonnummer"
                    value={formData.telefoonnummer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Upload secties */}
              <div className="space-y-6">
                {/* Tekeningen */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tekeningen</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload hier de tekeningen</p>
                  
                  {/* File list */}
                  {files.tekeningen.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {files.tekeningen.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeFile('tekeningen', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <div className="text-gray-400 mb-2">
                      <Upload className="mx-auto h-12 w-12" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Klik om bestanden te selecteren of sleep ze hierheen</p>
                    <p className="text-xs text-gray-500">Alleen JPEG, JPG en PNG bestanden tot 10MB</p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect('tekeningen', e.target.files)}
                      className="hidden"
                      id="tekeningen-upload"
                    />
                    <label 
                      htmlFor="tekeningen-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Bestanden selecteren
                    </label>
                  </div>
                </div>

                {/* 3D-bestanden */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3D-bestanden</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload hier de 3D-bestanden</p>
                  
                  {/* File list */}
                  {files['3d_bestanden'].length > 0 && (
                    <div className="mb-4 space-y-2">
                      {files['3d_bestanden'].map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeFile('3d_bestanden', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <div className="text-gray-400 mb-2">
                      <Upload className="mx-auto h-12 w-12" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Klik om bestanden te selecteren of sleep ze hierheen</p>
                    <p className="text-xs text-gray-500">Alleen JPEG, JPG en PNG bestanden tot 10MB</p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect('3d_bestanden', e.target.files)}
                      className="hidden"
                      id="3d-bestanden-upload"
                    />
                    <label 
                      htmlFor="3d-bestanden-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Bestanden selecteren
                    </label>
                  </div>
                </div>

                {/* Stuklijsten */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stuklijsten</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload hier de stuklijsten</p>
                  
                  {/* File list */}
                  {files.stuklijsten.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {files.stuklijsten.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeFile('stuklijsten', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <div className="text-gray-400 mb-2">
                      <Upload className="mx-auto h-12 w-12" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Klik om bestanden te selecteren of sleep ze hierheen</p>
                    <p className="text-xs text-gray-500">Alleen JPEG, JPG en PNG bestanden tot 10MB</p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect('stuklijsten', e.target.files)}
                      className="hidden"
                      id="stuklijsten-upload"
                    />
                    <label 
                      htmlFor="stuklijsten-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Bestanden selecteren
                    </label>
                  </div>
                </div>

                {/* Conservering specificaties */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Conservering specificaties</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload hier de Conservering specificaties</p>
                  
                  {/* File list */}
                  {files.conservering.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {files.conservering.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeFile('conservering', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <div className="text-gray-400 mb-2">
                      <Upload className="mx-auto h-12 w-12" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Klik om bestanden te selecteren of sleep ze hierheen</p>
                    <p className="text-xs text-gray-500">Alleen JPEG, JPG en PNG bestanden tot 10MB</p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect('conservering', e.target.files)}
                      className="hidden"
                      id="conservering-upload"
                    />
                    <label 
                      htmlFor="conservering-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Bestanden selecteren
                    </label>
                  </div>
                </div>

                {/* Certificering behoefte */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificering behoefte</h3>
                  <p className="text-sm text-gray-600 mb-4">Selecteer hieronder de certificering behoefte</p>
                  <select 
                    name="certificering_behoefte"
                    value={formData.certificering_behoefte}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecteer certificering</option>
                    <option value="iso9001">ISO 9001</option>
                    <option value="iso14001">ISO 14001</option>
                    <option value="ohsas18001">OHSAS 18001</option>
                    <option value="ce-markering">CE-markering</option>
                    <option value="tuv">TÜV certificering</option>
                    <option value="dnv">DNV certificering</option>
                    <option value="geen">Geen certificering nodig</option>
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={createOrder}
                  disabled={uploading || !formData.dossiernummer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Bezig met opslaan...</span>
                    </>
                  ) : (
                    <span>Order aanmaken</span>
                  )}
                </button>
              </div>
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

  // Form handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileSelect = (fileType, selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const maxSize = 10 * 1024 * 1024 // 10MB
      
      if (!validTypes.includes(file.type)) {
        setError(`Bestand ${file.name} is geen geldig bestandstype. Alleen JPEG, JPG en PNG zijn toegestaan.`)
        return false
      }
      
      if (file.size > maxSize) {
        setError(`Bestand ${file.name} is te groot. Maximum grootte is 10MB.`)
        return false
      }
      
      return true
    })
    
    setFiles(prev => ({
      ...prev,
      [fileType]: [...prev[fileType], ...validFiles]
    }))
    setError('')
  }

  const removeFile = (fileType, index) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: prev[fileType].filter((_, i) => i !== index)
    }))
  }

  const createOrder = async () => {
    try {
      setUploading(true)
      setError('')
      
      const response = await fetch('https://staalplatform-project.onrender.com/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`
        },
        body: JSON.stringify({
          dossiernummer: formData.dossiernummer,
          gewenste_leverdatum: formData.gewenste_leverdatum || null,
          contactpersoon: formData.contactpersoon,
          telefoonnummer: formData.telefoonnummer || null,
          certificering_behoefte: formData.certificering_behoefte || null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij aanmaken van order')
      }

      setOrderId(data.order.id)
      setSuccess('Order succesvol aangemaakt! Bestanden kunnen nu worden geüpload.')
      
      // Automatisch bestanden uploaden als er bestanden zijn geselecteerd
      await uploadAllFiles(data.order.id)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const uploadAllFiles = async (orderId) => {
    const allFiles = Object.entries(files).flatMap(([fileType, fileList]) =>
      fileList.map(file => ({ file, fileType }))
    )

    if (allFiles.length === 0) return

    setUploading(true)
    
    for (const { file, fileType } of allFiles) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileType', fileType)

        const response = await fetch(`https://staalplatform-project.onrender.com/api/orders/${orderId}/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.id}`
          },
          body: formData
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Fout bij uploaden van ${file.name}: ${errorData.error}`)
        }
      } catch (err) {
        setError(err.message)
        break
      }
    }
    
    setUploading(false)
    if (!error) {
      setSuccess('Alle bestanden succesvol geüpload!')
      setFiles({ tekeningen: [], '3d_bestanden': [], stuklijsten: [], conservering: [] })
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
                    {item.status === 0 && <XCircle size={18} className="text-red-500" />}
                    {item.status === 1 && <CheckCircle2 size={18} className="text-green-500" />}
                    {item.status === 2 && <Clock size={18} className="text-orange-500" />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>


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