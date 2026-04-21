import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'

const LandingPage = lazy(() => import('@/pages/public/LandingPage'))
const TeamPage = lazy(() => import('@/pages/public/TeamPage'))
const RobotPage = lazy(() => import('@/pages/public/RobotPage'))
const OutreachPage = lazy(() => import('@/pages/public/OutreachPage'))
const MatchesPage = lazy(() => import('@/pages/public/MatchesPage'))
const SponsorsPage = lazy(() => import('@/pages/public/SponsorsPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))

export function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/robot" element={<RobotPage />} />
        <Route path="/outreach" element={<OutreachPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
