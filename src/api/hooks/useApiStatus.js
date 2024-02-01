// custom hook to generate and keep track of api statuses

import { useState, useMemo } from 'react'
import { IDLE, defaultApiStatuses } from '../constants/apiStatus'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// generate list of statuses with is.... prefix
const prepareStatuses = (currentStatus) => {
  const statuses = {}

  for (const status of defaultApiStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase())
    const normalisedStatusKey = `is${normalisedStatus}`
    statuses[normalisedStatusKey] = status === currentStatus
  }
  return statuses
}

export const useApiStatus = (currentStatus = IDLE) => {
  const [status, setStatus] = useState(currentStatus)
  const statuses = useMemo(() => prepareStatuses(status), [status])

  return {
    status,
    setStatus,
    ...statuses,
  }
}
