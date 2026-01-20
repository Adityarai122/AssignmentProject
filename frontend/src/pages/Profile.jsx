import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import Header from '../components/layout/Header'
import { User, Mail, Code, LogOut, ChevronRight } from 'lucide-react'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-8 h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
              <div className="h-full w-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl font-bold border border-blue-100">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h1>
              <p className="text-gray-500">Full Stack Developer • {user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 border-2 border-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Account Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <label className="text-xs text-gray-500 block">Full Name</label>
                    <span className="text-sm font-medium">{user.name || 'Not provided'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <label className="text-xs text-gray-500 block">Email Address</label>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Skills & Expertise</h2>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
                <Code className="h-5 w-5 text-blue-500 mt-1" />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? (
                      user.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white border border-blue-100 text-blue-600 rounded-lg text-xs font-semibold shadow-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No skills added yet</span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="border-t px-8 py-6 bg-gray-50/50 flex justify-end gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
