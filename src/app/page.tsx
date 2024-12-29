'use client'
import { useState, useEffect } from 'react'
import MatrixBackground from '@/components/MatrixBackground'
import HackerTerminal from '@/components/HackerTerminal'
import SecretPortal from '@/components/SecretPortal'
import GlitchText from '@/components/GlitchText'

export default function Home() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [easterEggsFound, setEasterEggsFound] = useState(0)

  return (
    <div className="min-h-screen bg-black text-green-500 relative overflow-hidden">
      <MatrixBackground />
      
      {!accessGranted ? (
        <HackerTerminal onAccess={() => setAccessGranted(true)} />
      ) : (
        <main className="relative z-10 p-8">
          <GlitchText text="Welcome to Het's Cyber Realm" className="text-4xl mb-8" />
          
          <div className="space-y-6">
            <p className="font-mono">STATUS: ENCRYPTED</p>
            <p className="font-mono">EASTER EGGS FOUND: {easterEggsFound}/7</p>
            
            {/* Hidden button that only appears when inspecting elements */}
            <button 
              className="opacity-0 hover:opacity-100"
              onClick={() => setEasterEggsFound(prev => prev + 1)}
            >
              You found a secret!
            </button>
          </div>

          <SecretPortal />
        </main>
      )}
    </div>
  )
}
