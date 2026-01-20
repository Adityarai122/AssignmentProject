import { MapPin, Briefcase, Banknote, Bookmark, X } from 'lucide-react'

export default function JobCard({ job, onSelect, isActive, isSavedTab, onToggleSave }) {
  const { _id, company, title, location, salary, experienceLevel } = job
  return (
    <article
      onClick={() => onSelect(_id)}
      className={`cursor-pointer bg-white border rounded-xl p-5 shadow-sm hover:border-emerald-500 transition-all duration-200 group relative ${
        isActive ? 'border-emerald-500 ring-2 ring-emerald-50' : 'border-gray-100'
      }`}
    >
      {/* Remove Icon for Saved Tab */}
      {isSavedTab && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleSave(_id)
          }}
          className="absolute -top-2 -right-2 h-7 w-7 bg-white border border-red-100 text-red-500 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all z-10"
          title="Remove from saved"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="flex gap-4">
        {/* Left Side: Company Logo */}
        <div className="h-14 w-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl font-bold text-emerald-600 flex-shrink-0 shadow-sm group-hover:bg-white">
          {company?.[0] || 'C'}
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {job.applicationStatus && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  job.applicationStatus === 'APPLIED' ? 'bg-blue-100 text-blue-700' :
                  job.applicationStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  job.applicationStatus === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {job.applicationStatus}
                </span>
              )}
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-emerald-500 transition-colors" />
            </div>
          </div>
          
          <p className="text-base font-medium text-gray-600 mb-4">{company}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md border border-gray-100">
              <Briefcase className="h-4 w-4 text-emerald-500" />
              {experienceLevel}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-500" />
              {location}
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote className="h-4 w-4 text-emerald-500" />
              {salary ? `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} LPA` : 'N/A'}
            </span>
          </div>

          <button 
            className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              // Logic for similar jobs could go here
            }}
          >
            View similar jobs
          </button>
        </div>
      </div>
    </article>
  )
}

