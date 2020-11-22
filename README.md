# useAPI Hook

Custom hook for fetching data from an API.

## Features

1. Caching – if passed the same API with the same params, cached response will return.
2. Three states – `loading`, `success` and `error`.
3. Refetch – if `error` is returned, you possibly would want to send same request.
4. Automatic retries – specify a number of request retries to do in `error` case.

## Usage

```js
const [data, error, status, refetch] = useAPI(api, retries)

if (status === 'loading') {
  return <span className="loader" />
}

if (status === 'success') {
  return (
    <ol>
      {data instanceof Array ? (
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
```
