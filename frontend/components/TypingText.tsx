'use client'
import { useEffect, useState } from 'react'

const WORDS = [
  'scalable backend systems',
  'RAG-powered applications',
  'real-time streaming APIs',
  'ML pipelines under real constraints',
  'fault-tolerant systems',
  'data-intensive workflows',
]

export default function TypingText() {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[wordIdx]
    let timeout: NodeJS.Timeout

    if (!deleting) {
      if (charIdx < word.length) {
        timeout = setTimeout(() => setCharIdx(i => i + 1), 80)
      } else {
        timeout = setTimeout(() => setDeleting(true), 1600)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx(i => i - 1), 40)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % WORDS.length)
        timeout = setTimeout(() => {}, 300)
      }
    }

    setDisplayed(word.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx])

  return (
    <div className="flex items-center gap-1 text-[15px] h-6 mb-12">
      <span className="text-[#8b949e]">I build&nbsp;</span>
      <span className="text-[#58a6ff] font-semibold">{displayed}</span>
      <span className="inline-block w-[2px] h-4 bg-[#58a6ff] animate-[blink_1s_step-end_infinite]" />
    </div>
  )
}
