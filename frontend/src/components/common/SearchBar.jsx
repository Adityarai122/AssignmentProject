import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ filters, onChange }) {
  const [localQuery, setLocalQuery] = useState(filters.query || '')

  useEffect(() => {
    setLocalQuery(filters.query || '')
  }, [filters.query])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== (filters.query || '')) {
        onChange({ ...filters, query: localQuery })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localQuery])

  const handleSearch = () => {
    onChange({ ...filters, query: localQuery })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm flex-1 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by role or company..."
          className="w-full text-base outline-none"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="btn-primary bg-emerald-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

