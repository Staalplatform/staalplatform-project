import { useState } from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Staalplatform
          </h1>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                Count: <span className="font-bold">{count}</span>
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => setCount(count + 1)}
                variant="primary"
              >
                Increment
              </Button>
              
              <Button 
                onClick={() => setCount(count - 1)}
                variant="secondary"
              >
                Decrement
              </Button>
              
              <Button 
                onClick={() => setCount(0)}
                variant="outline"
              >
                Reset
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-gray-600">
              <p>✅ React 19.1.0 + Vite + TailwindCSS</p>
              <p>✅ TypeScript + ESLint geconfigureerd</p>
              <p>✅ Custom button componenten</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
