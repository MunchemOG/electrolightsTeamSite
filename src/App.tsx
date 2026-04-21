import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import { PublicRoutes } from '@/router/PublicRoutes'
import { PortalRoutes } from '@/router/PortalRoutes'

const PortalLogin = lazy(() => import('@/pages/portal/PortalLogin'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Secure Tactical Portal (Specific routes first) */}
        <Route path="/portal/login" element={<PortalLogin />} />
        <Route path="/portal/*" element={<PortalRoutes />} />

        {/* Public Marketing Site (Catch-all goes last) */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
