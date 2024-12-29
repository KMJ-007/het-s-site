'use client'
import { useState, useEffect } from 'react'
import GlitchText from './GlitchText'

export default function SecretPortal() {
  const [konami, setKonami] = useState<string[]>([])
  const [showSecret, setShowSecret] = useState(false)
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newKonami = [...prev, e.key]
        if (newKonami.length > konamiCode.length) {
          return newKonami.slice(1)
        }
        return newKonami
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (konami.join(',') === konamiCode.join(',')) {
      setShowSecret(true)
    }
  }, [konami])

  return (
    <div className="mt-12">
      {showSecret ? (
        <div className="border border-green-500 p-4 animate-pulse">
          <GlitchText text="🎮 KONAMI CODE ACTIVATED 🎮" />
          <p className="mt-4 text-sm">
            Here's a real cybersecurity tip: {' '}
            <span className="font-bold">
              Never use the same password twice!
            </span>
          </p>
          
          {/* Hidden message in HTML comments */}
          {/* Another easter egg: Check the Network tab */}
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=You're getting warmer!"
            alt="QR Code"
            className="mt-4 cursor-pointer"
            onClick={() => {
              // Secret console message
              console.log('%c🔓 Getting closer...', 'color: #00ff00; font-size: 20px;')
            }}
          />
        </div>
      ) : (
        <div className="text-xs opacity-30 hover:opacity-100 transition-opacity">
          {/* Hint in ROT13 encoding */}
          Uvag: Hfr gur Xbanzv Pbqr
        </div>
      )}
      
      {/* Hidden div with base64 encoded message */}
      <div className="hidden">
        SGV5ISBZb3UgZm91bmQgbWUhIFRyeSB0aGUgS29uYW1pIGNvZGUh
      </div>
    </div>
  )
} 