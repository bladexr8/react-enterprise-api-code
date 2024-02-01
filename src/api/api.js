import axios from 'axios'

// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/',
}

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams)

// returns a boolean if an error object passed is an instance of the
// Cancel error thrown by Axios
export const didAbort = (error) => axios.isCancel(error)

// assert if an error is an Axios error
export const isApiError = (error) => {
  return axios.isAxiosError(error)
}

// checks if the config object contains an abort property with a function
// as a value. If so, create a new abort controller, set its signal
// on the config object, and pass the abort method
const withAbort = (fn) => {
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1]
    // Extract abort property from the config
    const { abort: setAbortFn, ...config } = originalConfig

    // Create cancel token and abort method only if
    // abort function was passed
    if (typeof setAbortFn === 'function') {
      const abortController = new AbortController()
      config.signal = abortController.signal
      setAbortFn(() => {
        abortController.abort()
      })
    }

    try {
      if (args.length > 2) {
        const [url, body] = args
        return await fn(url, body, config)
      } else {
        const [url] = args
        return await fn(url, config)
      }
    } catch (error) {
      // add "aborted" property to the error
      // if the request was cancelled
      if (didAbort(error)) {
        error.aborted = true
      }
      throw error
    }
  }
  return executor
}

// Main api function
const api = (axios) => {
  return {
    get: (url, config = {}) => withAbort(axios.get)(url, config),
    delete: (url, config = {}) => withAbort(axios.get)(url, config),
    post: (url, body, config = {}) => withAbort(axios.post)(url, body, config),
    patch: (url, body, config = {}) => withAbort(axios.post)(url, body, config),
    put: (url, body, config = {}) => withAbort(axios.post)(url, body, config),
  }
}

export default api(axiosInstance)
