import TypingText from './TypingText'

export default function Hero() {
  return (
    <section id="home" className="max-w-[860px] mx-auto px-8 pt-36 pb-20">
      
      {/* Terminal Tag */}
      <p className="text-[#8b949e] text-[12px] mb-6 flex items-center gap-2 before:content-['~'] before:text-[#3fb950]">
        jagannath@portfolio:~$
      </p>

      {/* Name */}
      <h1 className="text-[clamp(28px,5vw,48px)] font-bold text-[#c9d1d9] tracking-tight leading-none mb-2">
        Jagannath Saha
      </h1>

      {/* Role (FIXED) */}
      <p className="text-[16px] text-[#8b949e] mb-3 font-normal">
        Backend Systems Artificial Intelligence & Machine Learning Developer
      </p>

      {/* Value Line (NEW — IMPORTANT) */}
      <p className="text-[14px] text-[#6e7681] mb-8 max-w-[600px]">
        Building scalable backend systems and ML-powered applications focused on performance, reliability, and real-world constraints.
      </p>

      {/* Typing Animation */}
      <TypingText />

      {/* CTA Buttons */}
      <div className="flex gap-3 flex-wrap mt-6">
        
        <a href="#projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-medium text-[12px]
            bg-[#58a6ff] text-[#0d1117] border border-[#58a6ff]
            hover:bg-[#79b8ff] hover:border-[#79b8ff] transition-all duration-150 tracking-wide no-underline">
          View Projects
        </a>

        <a href="https://github.com/jagannathsaha04" target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-medium text-[12px]
            bg-transparent text-[#c9d1d9] border border-[#30363d]
            hover:border-[#8b949e] hover:bg-[#21262d] transition-all duration-150 tracking-wide no-underline">
          GitHub
        </a>

        {/* FIXED Resume Link */}
        <a
  href="https://drive.google.com/uc?export=view&id=1g5XLcCmxwNUQABzSCmjfEOitWeyfltPz"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-medium text-[12px]
    bg-transparent text-[#c9d1d9] border border-[#30363d]
    hover:border-[#8b949e] hover:bg-[#21262d] transition-all duration-150 tracking-wide no-underline"
>
  Resume ↗
</a>

      </div>
    </section>
  )
}