'use client'
import { useState, useEffect } from 'react'

export default function GlitchText({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const glitchChars = '!@#$%^&*()<>[]{}|;:,.'
    let interval: NodeJS.Timeout

    const handleHover = () => {
      let iterations = 0
      
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev
            .split('')
            .map((char, idx) => {
              if (idx < iterations) return text[idx]
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join('')
        )

        iterations += 1/3
        if (iterations > text.length) {
          clearInterval(interval)
          setDisplayText(text)
        }
      }, 30)
    }

    handleHover()
    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
    </span>
  )
} 