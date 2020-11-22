import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAPI(api, retries) {
  const cache = useRef({})
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const count = useRef(retries)

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
          if (count.current > 0) {
            count.current--
            fetchData()
          } else {
            count.current = retries
            throw new Error("Page doesn't exist")
          }
        } else {
          const data = await response.json()
          cache.current[api] = data
          setData(data)
          setStatus('success')
        }
      } catch (error) {
        setError(error)
        setStatus('error')
      }
    }
  }, [api, retries])

  useEffect(() => {
    count.current = retries
    let isFetched = false
    if (!isFetched) {
      fetchData()
    }
    return () => (isFetched = true)
  }, [fetchData, count, retries]) //Is it safe to use ref and pro in deps?

  return [data, error, status, fetchData]
}
