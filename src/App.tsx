import React, { useState } from 'react'
import { Calculator } from 'lucide-react'

function App() {
  const [height, setHeight] = useState('')
  const [waistCircumference, setWaistCircumference] = useState('')
  const [bri, setBri] = useState<number | null>(null)
  const [error, setError] = useState('')

  const calculateBRI = () => {
    setError('')
    setBri(null)

    const h = parseFloat(height)
    const w = parseFloat(waistCircumference)

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setError('请输入有效的身高和腰围')
      return
    }

    const hm = h / 100 // 转换为米
    const wm = w / 100 // 转换为米
    const result = 364.2 - (365.5 * Math.sqrt(1 - ((wm / (2 * hm)) ** 2 + (wm / (10 * hm)) ** 2) / 2))
    
    if (isNaN(result)) {
      setError('计算结果无效，请检查输入值')
      return
    }
    
    setBri(parseFloat(result.toFixed(2)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <Calculator className="mr-2" /> BRI 计算器
        </h1>
        <div className="mb-4">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            身高 (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入身高"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
            腰围 (cm)
          </label>
          <input
            type="number"
            id="waist"
            value={waistCircumference}
            onChange={(e) => setWaistCircumference(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入腰围"
          />
        </div>
        <button
          onClick={calculateBRI}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          计算 BRI
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {bri !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">您的 BRI 是:</p>
            <p className="text-3xl font-bold text-blue-600">{bri}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App