import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserCircle2, LogOut, User } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

export default function Header() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false)

  const navItems = [
    { label: 'Jobs', path: '/' },
    { label: 'Hiring Partners', path: '/partners' },
  ]

  const onLogout = () => {
    dispatch(logout())
    setShowDropdown(false)
  }

  return (
    <header className="bg-white border-b relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-blue-600">
            JobBoard
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-blue-600 transition-colors ${
                  location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-all overflow-hidden"
              >
                {user?.name ? (
                  <span className="text-sm font-bold">{user.name[0].toUpperCase()}</span>
                ) : user?.email ? (
                  <span className="text-sm font-bold">{user.email[0].toUpperCase()}</span>
                ) : (
                  <UserCircle2 className="h-6 w-6" />
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b mb-1">
                    <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

