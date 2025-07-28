import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './components/Button'
import LanguageSwitcher from './components/LanguageSwitcher'
import Tooltip from './components/Tooltip'
import './App.css'

function App() {
  const { t } = useTranslation()
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Header met Language Switcher */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="page-title mb-4">{t('designSystem.title')}</h1>
            <p className="page-subtitle">
              {t('designSystem.subtitle')}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Alert Demo */}
        {showAlert && (
          <div className="mb-8">
            <div className="alert alert-info alert-dismissible">
              <strong>{t('designSystem.demo')}</strong>
              <button
                onClick={() => setShowAlert(false)}
                className="alert-close"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tooltip Demo Sectie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">Tooltips met Vertalingen</h3>
            <p className="section-description">Voorbeeld van hoe toelichtingen automatisch worden vertaald</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Knoppen met Tooltips</h4>
                <div className="flex flex-wrap gap-4">
                  <Tooltip translationKey="buttons.submitOrderTooltip">
                    <Button variant="primary">{t('buttons.submitOrder')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.saveDraftTooltip">
                    <Button variant="outline">{t('buttons.saveDraft')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.previewOrderTooltip">
                    <Button variant="secondary">{t('buttons.previewOrder')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.addAttachmentTooltip">
                    <Button variant="success">{t('buttons.addAttachment')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.calculatePriceTooltip">
                    <Button variant="warning">{t('buttons.calculatePrice')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.contactSupplierTooltip">
                    <Button variant="primary">{t('buttons.contactSupplier')}</Button>
                  </Tooltip>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Meer Tooltip Voorbeelden</h4>
                <div className="flex flex-wrap gap-4">
                  <Tooltip translationKey="buttons.markUrgentTooltip" position="bottom">
                    <Button variant="danger">{t('buttons.markUrgent')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.requestQuoteTooltip" position="left">
                    <Button variant="primary">{t('buttons.requestQuote')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.extendDeadlineTooltip" position="right">
                    <Button variant="outline">{t('buttons.extendDeadline')}</Button>
                  </Tooltip>
                  
                  <Tooltip translationKey="buttons.archiveOrderTooltip">
                    <Button variant="secondary">{t('buttons.archiveOrder')}</Button>
                  </Tooltip>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Hoe werkt dit?</h5>
                <p className="text-blue-800 text-sm">
                  <strong>1.</strong> Voeg de nieuwe tekst toe aan alle vertalingsbestanden (nl.json, en.json, de.json)<br/>
                  <strong>2.</strong> Gebruik de Tooltip component met de juiste translationKey<br/>
                  <strong>3.</strong> De tooltip wordt automatisch vertaald naar de geselecteerde taal<br/>
                  <strong>4.</strong> Wissel van taal met de Language Switcher om het resultaat te zien
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Knoppen Sectie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.buttons.title')}</h3>
            <p className="section-description">{t('designSystem.sections.buttons.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              {/* Knop varianten */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.buttons.variants')}</h4>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="warning">Warning</Button>
                </div>
              </div>

              {/* Knop groottes */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.buttons.sizes')}</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">{t('designSystem.labels.small')}</Button>
                  <Button variant="primary" size="md">{t('designSystem.labels.medium')}</Button>
                  <Button variant="primary" size="lg">{t('designSystem.labels.large')}</Button>
                  <Button variant="primary" size="xl">{t('designSystem.labels.extraLarge')}</Button>
                </div>
              </div>

              {/* Disabled state */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.buttons.states')}</h4>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>{t('designSystem.labels.disabled')}</Button>
                  <Button variant="outline" disabled>{t('designSystem.labels.disabledOutline')}</Button>
                </div>
              </div>

              {/* Full width */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.buttons.fullWidth')}</h4>
                <div className="space-y-2">
                  <Button variant="primary" fullWidth>{t('designSystem.labels.fullWidthPrimary')}</Button>
                  <Button variant="outline" fullWidth>{t('designSystem.labels.fullWidthOutline')}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Sectie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.badges.title')}</h3>
            <p className="section-description">{t('designSystem.sections.badges.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              {/* Basis badges */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.badges.basicBadges')}</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-secondary">Secondary</span>
                  <span className="badge badge-success">Success</span>
                  <span className="badge badge-warning">Warning</span>
                  <span className="badge badge-danger">Danger</span>
                  <span className="badge badge-info">Info</span>
                </div>
              </div>

              {/* Status badges */}
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('designSystem.sections.badges.statusBadges')}</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="badge badge-status-open">{t('designSystem.labels.open')}</span>
                  <span className="badge badge-status-pending">{t('designSystem.labels.inReview')}</span>
                  <span className="badge badge-status-closed">{t('designSystem.labels.closed')}</span>
                  <span className="badge badge-status-draft">{t('designSystem.labels.draft')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulieren Sectie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.forms.title')}</h3>
            <p className="section-description">{t('designSystem.sections.forms.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              {/* Input velden */}
              <div className="form-group">
                <label className="form-label form-label-required">{t('designSystem.labels.name')}</label>
                <input type="text" className="form-input" placeholder={t('designSystem.labels.namePlaceholder')} />
                <p className="form-help">{t('designSystem.labels.nameHelp')}</p>
              </div>

              <div className="form-group">
                <label className="form-label">{t('designSystem.labels.companyName')}</label>
                <input type="text" className="form-input" placeholder={t('designSystem.labels.companyNamePlaceholder')} />
              </div>

              <div className="form-group">
                <label className="form-label">{t('designSystem.labels.description')}</label>
                <textarea className="form-textarea" placeholder={t('designSystem.labels.descriptionPlaceholder')}></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">{t('designSystem.labels.category')}</label>
                <select className="form-select">
                  <option>{t('designSystem.labels.selectCategory')}</option>
                  <option>{t('designSystem.labels.steelConstruction')}</option>
                  <option>{t('designSystem.labels.bridges')}</option>
                  <option>{t('designSystem.labels.buildings')}</option>
                  <option>{t('designSystem.labels.infrastructure')}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('designSystem.labels.options')}</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox mr-2" />
                    <span>{t('designSystem.labels.urgent')}</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox mr-2" />
                    <span>{t('designSystem.labels.certificationRequired')}</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('designSystem.labels.supplierType')}</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="type" className="form-radio mr-2" />
                    <span>{t('designSystem.labels.smallSupplier')}</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="type" className="form-radio mr-2" />
                    <span>{t('designSystem.labels.largeSupplier')}</span>
                  </label>
                </div>
              </div>

              {/* Error state */}
              <div className="form-group">
                <label className="form-label form-label-required">{t('designSystem.labels.email')}</label>
                <input type="email" className="form-input form-input-error" placeholder={t('designSystem.labels.emailPlaceholder')} />
                <p className="form-error">{t('designSystem.labels.emailError')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Sectie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.alerts.title')}</h3>
            <p className="section-description">{t('designSystem.sections.alerts.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="alert alert-info">
                <strong>{t('designSystem.labels.information')}</strong> {t('designSystem.labels.informationText')}
              </div>
              
              <div className="alert alert-success">
                <strong>{t('common.success')}:</strong> {t('designSystem.labels.successText')}
              </div>
              
              <div className="alert alert-warning">
                <strong>{t('common.warning')}:</strong> {t('designSystem.labels.warningText')}
              </div>
              
              <div className="alert alert-error">
                <strong>{t('common.error')}:</strong> {t('designSystem.labels.errorText')}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.statusIndicators.title')}</h3>
            <p className="section-description">{t('designSystem.sections.statusIndicators.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="status-dot status-dot-success"></span>
                <span>{t('designSystem.labels.active')}</span>
              </div>
              <div className="flex items-center">
                <span className="status-dot status-dot-warning"></span>
                <span>{t('designSystem.labels.inProgress')}</span>
              </div>
              <div className="flex items-center">
                <span className="status-dot status-dot-danger"></span>
                <span>{t('designSystem.labels.blocked')}</span>
              </div>
              <div className="flex items-center">
                <span className="status-dot status-dot-info"></span>
                <span>{t('designSystem.labels.new')}</span>
              </div>
              <div className="flex items-center">
                <span className="status-dot status-dot-gray"></span>
                <span>{t('designSystem.labels.inactive')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading States */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.loadingStates.title')}</h3>
            <p className="section-description">{t('designSystem.sections.loadingStates.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="loading-spinner w-6 h-6"></div>
                <span>{t('designSystem.labels.loading')}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
                <span>{t('designSystem.labels.processing')}</span>
              </div>
              
              <Button variant="primary" disabled>
                <div className="loading-spinner w-4 h-4 mr-2"></div>
                {t('designSystem.labels.loading')}
              </Button>
            </div>
          </div>
        </div>

        {/* Kleuren Palet */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.colorPalette.title')}</h3>
            <p className="section-description">{t('designSystem.sections.colorPalette.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Primary Kleuren (Staal/Blauw)</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="color-primary-50 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">50</span>
                  </div>
                  <div className="text-center">
                    <div className="color-primary-100 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">100</span>
                  </div>
                  <div className="text-center">
                    <div className="color-primary-500 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">500</span>
                  </div>
                  <div className="text-center">
                    <div className="color-primary-600 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">600</span>
                  </div>
                  <div className="text-center">
                    <div className="color-primary-700 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">700</span>
                  </div>
                  <div className="text-center">
                    <div className="color-primary-900 w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">900</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Status Kleuren</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="color-success w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">{t('common.success')}</span>
                  </div>
                  <div className="text-center">
                    <div className="color-warning w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">{t('common.warning')}</span>
                  </div>
                  <div className="text-center">
                    <div className="color-danger w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">{t('common.error')}</span>
                  </div>
                  <div className="text-center">
                    <div className="color-info w-16 h-16 rounded-lg mx-auto mb-2 border"></div>
                    <span className="text-xs">{t('common.info')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typografie */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="section-title">{t('designSystem.sections.typography.title')}</h3>
            <p className="section-description">{t('designSystem.sections.typography.description')}</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <h1>{t('designSystem.labels.pageTitle')}</h1>
              <h2>{t('designSystem.labels.sectionTitle')}</h2>
              <h3>{t('designSystem.labels.subsectionTitle')}</h3>
              <h4>{t('designSystem.labels.groupTitle')}</h4>
              <h5>{t('designSystem.labels.itemTitle')}</h5>
              <h6>{t('designSystem.labels.smallTitle')}</h6>
              
              <div className="border-t pt-4">
                <p className="text-base">{t('designSystem.labels.normalText')}</p>
                <p className="text-sm text-gray-600">{t('designSystem.labels.smallText')}</p>
                <p className="text-xs text-gray-500">{t('designSystem.labels.verySmallText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
