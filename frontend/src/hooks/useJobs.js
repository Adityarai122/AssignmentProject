import { useEffect, useMemo, useState } from 'react'
import { jobsApi } from '../services'

export default function useJobs(selectedId, category = 'Recommended') {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [filters, setFilters] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchJobs = async () => {
    setIsLoading(true)
    try {
      let data = []
      if (category === 'Applied') {
        const response = await jobsApi.getApplied()
        // Applied jobs: attach application metadata (status) to the job object
        data = response.map(app => ({
          ...app.job,
          applicationStatus: app.status
        }))
      } else if (category === 'Saved') {
        data = await jobsApi.getSaved()
      } else {
        data = await jobsApi.list(filters)
      }

      setJobs(data)
      if (selectedId) {
        const match = data.find((j) => j._id === selectedId)
        setSelectedJob(match || null)
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchJobDetail = async (id) => {
    if (!id) return
    setIsLoading(true)
    try {
      const data = await jobsApi.getById(id)
      setSelectedJob(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [filters, category])

  useEffect(() => {
    if (selectedId) {
      fetchJobDetail(selectedId)
    }
  }, [selectedId])

  const applyToJob = useMemo(
    () => async (id) => {
      await jobsApi.apply(id)
      await fetchJobDetail(id)
      await fetchJobs() // Refresh the list (useful for applicant counts or if we implement isApplied)
    },
    [],
  )

  const toggleSaveJob = useMemo(
    () => async (id) => {
      await jobsApi.save(id)
      await fetchJobDetail(id)
      await fetchJobs() // Sync counts/flags
    },
    [],
  )

  return {
    jobs,
    selectedJob,
    filters,
    setFilters,
    isLoading,
    applyToJob,
    toggleSaveJob,
  }
}

