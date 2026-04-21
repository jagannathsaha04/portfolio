'use client'
import { useState } from 'react'
import { PROJECTS } from '@/lib/projects'
import ProjectDetail from './ProjectDetail'

export default function ProjectsList() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="projects" className="max-w-[860px] mx-auto px-8 py-20">
      <SectionHeader label="projects" />
      <div className="flex flex-col gap-2">
        {PROJECTS.map(p => (
          <div key={p.id} className={`border rounded-lg overflow-hidden transition-colors duration-150
            ${open === p.id ? 'border-[#8b949e]' : 'border-[#30363d] hover:border-[#8b949e]'}`}>
            <button
              onClick={() => setOpen(open === p.id ? null : p.id)}
              className="w-full bg-transparent text-left px-5 py-4 flex items-center gap-2.5
                text-[13px] cursor-pointer hover:bg-[#161b22] transition-colors duration-150"
            >
              <span className="text-[#58a6ff] font-bold">&gt;</span>
              <span className="font-semibold text-[#c9d1d9]">{p.name}</span>
              <span className="text-[#8b949e] text-[12px] ml-auto">{p.tagline}</span>
              <span className={`text-[#8b949e] text-[10px] ml-2 transition-transform duration-200
                ${open === p.id ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {open === p.id && <ProjectDetail project={p} />}
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-9">
      <span className="text-[#3fb950] text-[13px]">$</span>
      <h2 className="text-[13px] font-medium text-[#8b949e] uppercase tracking-widest">{label}</h2>
      <div className="flex-1 h-px bg-[#30363d]" />
    </div>
  )
}
