import { useState } from 'react'
import './App.css'
import FetchData from './FetchData'

function App() {
  const [api, setAPI] = useState('https://jsonplaceholder.typicode.com/users/')
  const [field, setField] = useState('name')

  const handleSubmit = e => {
    e.preventDefault()
    const [api, field] = new FormData(e.target)
    setAPI(api[1])
    setField(field[1])
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="api">API:</label>
        <input
          className="App__input"
          type="text"
          id="api"
          name="api"
          defaultValue={api}
        />
        <label htmlFor="field">Field:</label>
        <input
          className="App__input"
          type="text"
          id="field"
          name="field"
          defaultValue={field}
        />
        <button>Send request</button>
      </form>
      <FetchData api={api} field={field} />
    </div>
  )
}

export default App
