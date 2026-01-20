const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
  },
  jobs: {
    root: '/jobs',
    applied: '/jobs/applied',
    saved: '/jobs/saved',
    byId: (id) => `/jobs/${id}`,
    apply: (id) => `/jobs/${id}/apply`,
    save: (id) => `/jobs/${id}/save`,
  },
}

export default API_BASE_URL

