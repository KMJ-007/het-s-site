'use client'
import { useState, useEffect } from 'react'
import GlitchText from './GlitchText'

interface SecretPortalProps {
  onEasterEggFound: () => void
}

export default function SecretPortal({ onEasterEggFound }: SecretPortalProps) {
  const [konami, setKonami] = useState<string[]>([])
  const [showSecret, setShowSecret] = useState(false)
  const [mousePattern, setMousePattern] = useState<string[]>([])
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  // Konami code handler
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

  // Mouse pattern handler (new easter egg)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const direction = e.movementX > 0 ? 'right' : 'left'
      setMousePattern(prev => {
        const newPattern = [...prev, direction]
        if (newPattern.join('') === 'leftrightrightleft') {
          onEasterEggFound()
          return []
        }
        return newPattern.slice(-5)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [onEasterEggFound])

  // Check Konami code
  useEffect(() => {
    if (konami.join(',') === konamiCode.join(',')) {
      setShowSecret(true)
      onEasterEggFound()
    }
  }, [konami, onEasterEggFound])

  // Source code comment easter egg
  useEffect(() => {
    console.log(
      '%cLooking at the source code? Here\'s an egg for you! Type "hackerman" in the console',
      'color: #0f0; font-size: 12px'
    )
    
    const originalLog = console.log
    // @ts-ignore
    console.log = (...args: any[]) => {
      if (args[0] === 'hackerman') {
        onEasterEggFound()
        alert('🥚 You found a console egg!')
      }
      originalLog.apply(console, args)
    }
    
    return () => {
      // @ts-ignore
      console.log = originalLog
    }
  }, [onEasterEggFound])

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
          
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=You're getting warmer!"
            alt="QR Code"
            className="mt-4 cursor-pointer"
            onClick={() => {
              console.log('%c🔓 Getting closer...', 'color: #00ff00; font-size: 20px;')
              onEasterEggFound()
            }}
          />
        </div>
      ) : (
        <div 
          className="text-xs opacity-30 hover:opacity-100 transition-opacity"
          onContextMenu={(e) => {
            e.preventDefault()
            onEasterEggFound()
            alert('🥚 Right-click egg found!')
          }}
        >
          {/* Hint in ROT13 encoding */}
          Uvag: Hfr gur Xbanzv Pbqr
        </div>
      )}
      
      <div className="hidden">
        SGV5ISBZb3UgZm91bmQgbWUhIFRyeSB0aGUgS29uYW1pIGNvZGUh
      </div>
    </div>
  )
} 