import { fetchDog } from '@/api/animal.api'
import { useEffect, useState } from 'react'
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus'
import { withAsync } from '@/helpers/withAsync'

const useFetchDog = () => {
  const [dog, setDog] = useState()
  const [fetchDogStatus, setFetchDogStatus] = useState(IDLE)

  const initFetchDog = async () => {
    setFetchDogStatus(PENDING)
    const { response, error } = await withAsync(() => fetchDog())
    if (error) {
      setFetchDogStatus(ERROR)
    } else if (response) {
      setDog(response.data.message)
      setFetchDogStatus(SUCCESS)
    }
  }

  return {
    dog,
    fetchDogStatus,
    initFetchDog,
  }
}

function AnimalExampleWithApiStatesConstants() {
  const { dog, fetchDogStatus, initFetchDog } = useFetchDog()

  useEffect(() => {
    initFetchDog()
  }, [])

  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          {fetchDogStatus === IDLE ? <p>Welcome</p> : null}
          {fetchDogStatus === PENDING ? <p>Loading Data...</p> : null}
          {fetchDogStatus === ERROR ? <p>There was a problem</p> : null}
          {fetchDogStatus === SUCCESS ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={initFetchDog}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch Animals
      </button>
    </div>
  )
}

export default AnimalExampleWithApiStatesConstants
