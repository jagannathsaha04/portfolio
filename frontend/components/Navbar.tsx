'use client'
import Link from 'next/link'

const links = ['home', 'projects', 'github', 'about', 'contact']

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-8
      bg-[rgba(13,17,23,0.92)] backdrop-blur-[12px] border-b border-[#30363d]">
      <a href="#home" className="text-[#58a6ff] text-[13px] font-semibold tracking-wide no-underline">
        ~/jagannath
      </a>
      <ul className="flex list-none gap-0">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l}`}
              className="text-[#8b949e] text-[12px] px-3.5 py-1.5 rounded-md no-underline
                hover:text-[#c9d1d9] hover:bg-[#21262d] transition-all duration-150 tracking-wide"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
