import { SlidersHorizontal, X } from 'lucide-react'
import { FILTER_CONFIGS } from '../../constants/filter.constants'

export default function FilterBar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {FILTER_CONFIGS.map((cfg) => (
        <div key={cfg.key} className="relative flex items-center group">
          <select
            className={`bg-white border border-gray-200 rounded-lg py-1 text-xs text-gray-700 shadow-sm hover:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer min-w-[90px] ${
              filters[cfg.key] ? 'pl-2 pr-6' : 'px-2'
            }`}
            value={filters[cfg.key] || ''}
            onChange={(e) => update(cfg.key, e.target.value)}
          >
            <option value="">{cfg.label}</option>
            {cfg.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {filters[cfg.key] && (
            <button
              onClick={() => update(cfg.key, '')}
              className="absolute right-1.5 p-0.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-emerald-600 transition-all"
              title={`Clear ${cfg.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}

      <button 
        onClick={() => onChange({})}
        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-all active:scale-95 whitespace-nowrap"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Clear
      </button>
    </div>
  )
}

