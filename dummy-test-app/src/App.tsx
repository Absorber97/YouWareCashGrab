import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  return (
    <div className="container">
      <header>
        <h1>YouWare IDE Plugin Test</h1>
        <p className="subtitle">Testing local → YouWare workflow</p>
      </header>

      <main>
        <section className="card">
          <h2>Counter Test</h2>
          <button onClick={() => setCount((count) => count + 1)}>
            Count: {count}
          </button>
        </section>

        <section className="card">
          <h2>Input Test</h2>
          <input 
            type="text" 
            placeholder="Type something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && <p>You typed: {message}</p>}
        </section>

        <section className="card info">
          <h2>Test Checklist</h2>
          <ul>
            <li>Built locally with Vite + React + TypeScript</li>
            <li>Published via IDE Plugin to YouWare</li>
            <li>Check if editable in YouWare after publish</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>Created: {new Date().toLocaleString()}</p>
        <p>Version: LOCAL-v1</p>
      </footer>
    </div>
  )
}

export default App
