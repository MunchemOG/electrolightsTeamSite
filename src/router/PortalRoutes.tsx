import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PortalLayout } from '@/layouts/PortalLayout'
import { AuthGuard } from '@/router/AuthGuard'

const PortalDashboard = lazy(() => import('@/pages/portal/PortalDashboard'))
const PortalTasks = lazy(() => import('@/pages/portal/PortalTasks'))
const PortalCalendar = lazy(() => import('@/pages/portal/PortalCalendar'))
const PortalInventory = lazy(() => import('@/pages/portal/PortalInventory'))
const PortalScouting = lazy(() => import('@/pages/portal/PortalScouting'))
const PortalUpdates = lazy(() => import('@/pages/portal/PortalUpdates'))
const PortalAdmin = lazy(() => import('@/pages/portal/PortalAdmin'))

export function PortalRoutes() {
  return (
    <AuthGuard>
      <Routes>
        <Route element={<PortalLayout />}>
          {/* Automatically throw users into the dashboard immediately upon portal entry */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<PortalDashboard />} />
          <Route path="tasks" element={<PortalTasks />} />
          <Route path="calendar" element={<PortalCalendar />} />
          <Route path="inventory" element={<PortalInventory />} />
          <Route path="scouting" element={<PortalScouting />} />
          <Route path="updates" element={<PortalUpdates />} />
          <Route path="admin" element={<PortalAdmin />} />
        </Route>
      </Routes>
    </AuthGuard>
  )
}
