import { useState } from 'react'
import Header from '../components/layout/Header'
import SearchBar from '../components/common/SearchBar'
import FilterBar from '../components/common/FilterBar'
import JobList from '../components/job/JobList'
import JobDetail from '../components/job/JobDetail'
import useJobs from '../hooks/useJobs'

export default function Home() {
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [activeTab, setActiveTab] = useState('Recommended')
  
  const {
    jobs,
    selectedJob,
    filters,
    setFilters,
    isLoading,
    applyToJob,
    toggleSaveJob,
  } = useJobs(selectedJobId, activeTab)

  const [notification, setNotification] = useState(null)

  const handleApply = async (id) => {
    try {
      await applyToJob(id)
      setNotification({ message: 'Applied successfully!', type: 'success' })
      setTimeout(() => setNotification(null), 3000)
    } catch (err) {
      const isAuthError = err.response?.status === 401 || err.message?.includes('401')
      const message = isAuthError 
        ? 'Please login to apply for jobs' 
        : (err.response?.data?.message || err.message || 'Failed to apply')
      
      setNotification({ message, type: 'error' })
      
      if (isAuthError) {
        // Optional: redirect to login after a delay
        setTimeout(() => navigate('/login'), 2000)
      }
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleSelectJob = (jobId) => setSelectedJobId(jobId)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 ${
            notification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            {notification.message}
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 flex-wrap">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-semibold capitalize">{activeTab === 'Recommended' ? 'Jobs for you' : `${activeTab} Jobs`}</h1>
            <p className="text-sm text-gray-500">
              {activeTab === 'Recommended' ? 'Personalized recommendations' : `Your ${activeTab.toLowerCase()} job listings`}
            </p>
          </div>
          <div className="flex-1 max-w-2xl w-full">
            <SearchBar filters={filters} onChange={setFilters} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-2 text-xs font-medium text-gray-600">
            {['Recommended', 'Applied', 'Saved'].map((tab) => (
              <span
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSelectedJobId(null)
                  if (tab === 'Recommended') {
                    setFilters({}) // Clear previous state/filters as requested
                  }
                }}
                className={`cursor-pointer px-4 py-2 rounded-full shadow-sm border transition-all active:scale-95 ${
                  activeTab === tab 
                    ? 'bg-emerald-600 border-emerald-600 text-white font-bold' 
                    : 'bg-white border-gray-100 hover:border-gray-300'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="flex-1 flex justify-end">
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
        </div>

        <section className={`grid gap-6 ${selectedJobId ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          <JobList
            jobs={jobs}
            isLoading={isLoading}
            onSelect={handleSelectJob}
            selectedId={selectedJobId}
            isSplitView={!!selectedJobId}
            isSavedTab={activeTab === 'Saved'}
            onToggleSave={toggleSaveJob}
          />

          {selectedJobId && (
            <div className="lg:sticky lg:top-6 h-fit w-full">
              <JobDetail
                job={selectedJob}
                onApply={handleApply}
                onSave={toggleSaveJob}
                isLoading={isLoading}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

