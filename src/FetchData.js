import useAPI from './useAPI'

export default function FetchData({ api, field, retries }) {
  const [data, error, status, refetch] = useAPI(api, retries)

  if (status === 'loading') {
    return <span className="loader" />
  }

  if (status === 'success') {
    return (
      <ol>
        {Array.isArray(data) ? (
          data.map(el => <li key={el[field]}>{el[field]}</li>)
        ) : (
          <li key={data.field}>{data[field]}</li>
        )}
      </ol>
    )
  }

  if (status === 'error') {
    return (
      <div className="App__error">
        <p>Oops! Something went wrong:</p>
        <p>{error.message}</p>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    )
  }
}
