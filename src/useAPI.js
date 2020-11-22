import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAPI(api) {
  const cache = useRef({})
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setStatus('loading')
    if (cache.current[api]) {
      const data = cache.current[api]
      setData(data)
      setStatus('success')
    } else {
      try {
        const response = await fetch(api)
        if (!response.ok) {
          throw new Error("Page doesn't exist")
        }
        const data = await response.json()
        cache.current[api] = data
        setData(data)
        setStatus('success')
      } catch (error) {
        setError(error)
        setStatus('error')
      }
    }
  }, [api])

  useEffect(() => {
    let isFetched = false
    if (!isFetched) {
      fetchData()
    }
    return () => (isFetched = true)
  }, [fetchData])

  return [data, error, status, fetchData]
}
