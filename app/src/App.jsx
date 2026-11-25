import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CounterPage from './pages/CounterPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CounterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
