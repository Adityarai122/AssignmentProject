import JobCard from './JobCard'

export default function JobList({ jobs, isLoading, onSelect, selectedId, isSplitView, isSavedTab, onToggleSave }) {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">Loading jobs...</p>
      </div>
    )
  }

  if (!jobs.length) {
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <p className="text-sm text-gray-500">No jobs found. Try adjusting filters.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-4 ${
      isSplitView 
        ? 'grid-cols-1' 
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {jobs.map((job) => (
        <JobCard 
          key={job._id} 
          job={job} 
          onSelect={onSelect} 
          isActive={selectedId === job._id}
          isSavedTab={isSavedTab}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}

