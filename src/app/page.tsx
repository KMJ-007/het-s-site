'use client'
import { useState } from 'react'
import MatrixBackground from '@/components/MatrixBackground'
import HackerTerminal from '@/components/HackerTerminal'
import SecretPortal from '@/components/SecretPortal'
import GlitchText from '@/components/GlitchText'

export default function Home() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [easterEggsFound, setEasterEggsFound] = useState(0)

  const handleEasterEggFound = () => {
    setEasterEggsFound(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-black text-green-500 relative overflow-hidden font-mono">
      <MatrixBackground />
      
      {!accessGranted ? (
        <HackerTerminal onAccess={() => setAccessGranted(true)} />
      ) : (
        <main className="relative z-10 p-8">
          <GlitchText text="Welcome to Het's Cyber Realm" className="text-4xl mb-8" />
          
          <div className="space-y-6">
            <p>STATUS: ENCRYPTED</p>
            <p>EASTER EGGS FOUND: {easterEggsFound}/7</p>
            
            {/* Hidden button that only appears when inspecting elements */}
            <button 
              type="button"
              className="opacity-0 hover:opacity-100"
              onClick={handleEasterEggFound}
            >
              You found a secret!
            </button>
          </div>

          <SecretPortal onEasterEggFound={handleEasterEggFound} />
        </main>
      )}
    </div>
  )
}
