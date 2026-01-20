import apiClient from './apiClient'
import { API_ROUTES } from './apiConfig'

const list = async (filters = {}) => {
  const { data } = await apiClient.get(API_ROUTES.jobs.root, { params: filters })
  // Backend returns { jobs, pagination } inside data.data
  if (data?.data?.jobs) {
    return data.data.jobs
  }
  return data?.data || []
}

const getById = async (id) => {
  const { data } = await apiClient.get(API_ROUTES.jobs.byId(id))
  return data?.data
}

const apply = async (id) => {
  const { data } = await apiClient.post(API_ROUTES.jobs.apply(id))
  return data?.data
}

const save = async (id) => {
  const { data } = await apiClient.post(API_ROUTES.jobs.save(id))
  return data?.data
}

const getApplied = async () => {
  const { data } = await apiClient.get(API_ROUTES.jobs.applied)
  return data?.data || []
}

const getSaved = async () => {
  const { data } = await apiClient.get(API_ROUTES.jobs.saved)
  return data?.data || []
}

export default { list, getById, apply, save, getApplied, getSaved }

