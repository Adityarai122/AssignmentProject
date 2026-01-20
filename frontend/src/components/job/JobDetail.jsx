import { Briefcase, MapPin, Banknote, Users, CheckCircle2, ExternalLink } from 'lucide-react'

export default function JobDetail({ job, onApply, onSave, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full bg-white border rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">Loading job detail...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="w-full bg-white border rounded-lg p-6 shadow-sm text-center text-sm text-gray-500">
        Select a job to view details.
      </div>
    )
  }

  const { company, title, createdAt, applicantsCount, experienceLevel, location, salary, description, skills } = job

  return (
    <div className="w-full bg-white border rounded-lg p-6 shadow-sm flex flex-col min-h-[calc(100vh-6rem)]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-50 border border-emerald-100 flex items-center justify-center text-base font-bold text-emerald-600 shadow-sm">
            {company?.[0] || 'C'}
          </div>
          <div>
            <h2 className="text-xl font-black text-emerald-600 leading-tight">{company}</h2>
            <p className="text-base font-bold text-emerald-600/90">{title}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1 font-medium">{title}</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-600 font-medium">Posted {createdAt ? new Date(createdAt).toLocaleDateString() : '-'}</span>
          <span className="text-gray-400">•</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
            <Users className="h-4 w-4" />
            {applicantsCount || 0} applicants
          </span>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-gray-700">
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-emerald-600" />
            {experienceLevel}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-emerald-600" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Banknote className="h-4 w-4 text-emerald-600" />
            {salary ? `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} LPA` : 'N/A'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              job.applicationStatus 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
            onClick={() => !job.applicationStatus && onApply(job._id)}
            disabled={!!job.applicationStatus}
          >
            {job.applicationStatus ? 'Already Applied' : 'Apply'}
          </button>
          <div className="flex items-center gap-2">
            <button
              className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
              onClick={() => onSave(job._id)}
              title="Save"
            >
              <CheckCircle2 className="h-5 w-5" />
            </button>
            <button className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors" title="Link">
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>
        </div>

        {skills && skills.length > 0 && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4 space-y-4">
          {(description || []).map((section, index) => (
            <div key={index}>
              {section.heading && (
                <h3 className="text-sm font-semibold mb-1">{section.heading}</h3>
              )}
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-auto w-full text-center border-2 border-blue-100 text-blue-600 font-semibold rounded-xl py-3 text-sm hover:bg-blue-50 transition-colors">
        View similar jobs
      </button>
    </div>
  )
}

