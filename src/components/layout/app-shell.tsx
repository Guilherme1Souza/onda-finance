import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Waves,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/hooks/useAuth'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
]

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-dvh">
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface">
        <div className="flex items-center gap-2.5 px-6 py-6 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/10 border border-green/20">
            <Waves className="h-4 w-4 text-green" />
          </div>
          <span className="font-display font-bold text-lg text-text tracking-tight">
            Onda
          </span>
          <span className="text-text-subtle font-display text-lg">Finance</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium font-display transition-all duration-200',
                  isActive
                    ? 'bg-green/10 text-green border border-green/20'
                    : 'text-text-muted hover:bg-surface2 hover:text-text',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green/10 border border-green/20">
              <span className="text-xs font-bold font-display text-green">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium font-display text-text truncate">
                {user?.name}
              </p>
              <p className="text-xs text-text-subtle truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-surface2 hover:text-text transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 min-h-dvh">
        <Outlet />
      </main>
    </div>
  )
}
