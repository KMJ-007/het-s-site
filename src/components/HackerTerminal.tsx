'use client'
import { useState } from 'react'

export default function HackerTerminal({ onAccess }: { onAccess: () => void }) {
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Easter egg: Any input containing "please" grants access
    if (input.toLowerCase().includes('please')) {
      onAccess()
      return
    }

    setAttempts(prev => prev + 1)
    setInput('')
    
    // Easter egg: After 3 attempts, show a hint
    if (attempts === 2) {
      alert('HINT: Manners maketh man')
    }
  }

  return (
    <div className="relative z-10 h-screen flex items-center justify-center">
      <div className="bg-black/80 p-8 rounded-lg border border-green-500">
        <pre className="text-green-500 mb-4">
          {`
    ╔═══════════════════════════════════════╗
    ║        SECURITY AUTHENTICATION        ║
    ║         Clearance Required            ║
    ╚═══════════════════════════════════════╝
          `}
        </pre>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black border border-green-500 text-green-500 p-2 w-full font-mono"
            placeholder="Enter access code..."
            autoFocus
          />
          <button 
            type="submit"
            className="w-full border border-green-500 text-green-500 p-2 hover:bg-green-500 hover:text-black transition-colors"
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  )
} 