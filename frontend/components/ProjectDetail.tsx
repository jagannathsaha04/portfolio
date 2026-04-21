import { Project } from '@/lib/projects'

interface Props { project: Project }

export default function ProjectDetail({ project }: Props) {
  return (
    <div className="border-t border-[#30363d] p-6 bg-[#161b22]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <Block title="Problem"><p>{project.problem}</p></Block>
        <Block title="Solution"><p>{project.solution}</p></Block>
      </div>

      <Block title="Architecture">
        <pre className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 text-[11px]
          text-[#3fb950] overflow-x-auto leading-relaxed whitespace-pre font-mono">
          {project.architecture}
        </pre>
      </Block>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <Block title="Tech Stack">
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.stack.map(t => (
              <span key={t} className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9]
                px-2.5 py-0.5 rounded text-[11px]">{t}</span>
            ))}
          </div>
        </Block>
        <Block title="Key Engineering Decisions">
          <ul className="list-disc pl-4">
            {project.decisions.map(d => <li key={d} className="mb-1">{d}</li>)}
          </ul>
        </Block>
        <Block title="Challenges">
          <ul className="list-disc pl-4">
            {project.challenges.map(c => <li key={c} className="mb-1">{c}</li>)}
          </ul>
        </Block>
        <Block title="Future Improvements">
          <ul className="list-disc pl-4">
            {project.improvements.map(i => <li key={i} className="mb-1">{i}</li>)}
          </ul>
        </Block>
      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[#58a6ff] text-[11px] uppercase tracking-widest mb-2 font-semibold">{title}</h4>
      <div className="text-[#c9d1d9] text-[12px] leading-relaxed [&_ul_li::marker]:text-[#58a6ff]">
        {children}
      </div>
    </div>
  )
}
