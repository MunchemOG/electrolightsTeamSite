import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, Calendar, Box, Activity, Bell, ShieldAlert, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PortalLayout() {
  const location = useLocation()
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/portal/dashboard' },
    { name: 'Tasks', icon: CheckSquare, path: '/portal/tasks' },
    { name: 'Calendar', icon: Calendar, path: '/portal/calendar' },
    { name: 'Inventory', icon: Box, path: '/portal/inventory' },
    { name: 'Scouting', icon: Activity, path: '/portal/scouting' },
    { name: 'Updates', icon: Bell, path: '/portal/updates' },
  ]

  return (
    <div className="flex h-screen bg-bg-base text-text-main">
      {/* Sidebar Stub */}
      <aside className="flex w-64 flex-col border-r border-glass bg-bg-surface">
        {/* Portal Branding */}
        <div className="flex h-16 items-center px-6 border-b border-glass">
          <Link to="/" className="font-bold tracking-tight text-white hover:text-brand-electric transition-colors">
            ELECTROLIGHTS<span className="text-brand-orange">_OS</span>
          </Link>
        </div>
        
        {/* Core Architecture Links */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-brand-electric/10 text-brand-electric" 
                    : "text-text-muted hover:bg-glass hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" /> {item.name}
              </Link>
            )
          })}

          <div className="my-4 h-px w-full bg-glass" />
          
          <Link to="/portal/admin" className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            location.pathname.includes('/admin')
              ? "bg-brand-orange/10 text-brand-orange"
              : "text-brand-orange/70 hover:bg-glass hover:text-brand-orange"
          )}>
            <ShieldAlert className="h-4 w-4" /> Admin Console
          </Link>
        </nav>

        {/* User Profile Stub */}
        <div className="border-t border-glass p-4 bg-bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-brand-electric/20 flex items-center justify-center border border-brand-electric">
                <span className="text-sm font-bold text-brand-electric">MK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white leading-tight">Mithu</span>
                <span className="text-[11px] text-brand-orange">Administrator</span>
              </div>
            </div>
            <button className="text-text-muted hover:text-destructive-base transition-colors p-2" title="Log Out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-bg-base relative">
        <Outlet />
      </main>
    </div>
  )
}
