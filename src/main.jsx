import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import HomePage from './App'
import Test from './Test'
import Watchlist from './pages/Watchlist'
import ShowDetail from './pages/ShowDetail'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}> 
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
