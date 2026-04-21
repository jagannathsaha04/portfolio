import { SectionHeader } from './ProjectsList'

const exploring = [
  { text: 'RAG systems — chunking strategies, hybrid retrieval, reranking' },
  { text: 'Scalable backend architectures — event-driven, async patterns' },
  { text: 'Efficient ML pipelines — quantization, batching, latency reduction' },
  { text: 'Open to internships and placement opportunities' },
]

export default function About() {
  return (
    <section id="about" className="max-w-[860px] mx-auto px-8 py-20">
      <SectionHeader label="about" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="text-[13px] leading-relaxed space-y-4">
          <p>
            I&apos;m a developer focused on{' '}
            <span className="text-[#58a6ff]">backend systems</span> and{' '}
            <span className="text-[#58a6ff]">machine learning</span> — the parts
            that make applications actually work under the hood.
          </p>
          <p>
            I think about <span className="text-[#58a6ff]">systems first</span>: data flow,
            failure modes, scale constraints, and clean abstractions —
            before writing a line of code.
          </p>
          <p>
            I gravitate toward FastAPI and Spring Boot on the backend, and explore
            ML problems at the intersection of{' '}
            <span className="text-[#58a6ff]">language, audio, and retrieval</span>.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] text-[#8b949e] uppercase tracking-widest mb-4">
            // currently exploring
          </h4>
          {exploring.map(({ text }) => (
            <div key={text} className="flex items-start gap-2.5 mb-3 text-[12px]">
              <span className="text-[#58a6ff] mt-0.5">→</span>
              <span className="text-[#c9d1d9] leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
