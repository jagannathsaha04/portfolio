import { SectionHeader } from './ProjectsList'

const links = [
  { label: 'email', value: 'hello.jagannathsaha@gmail.com', href: 'mailto:hello.jagannathsaha@gmail.com' },
  { label: 'github', value: 'github.com/jagannathsaha04', href: 'https://github.com/jagannathsaha04' },
  { label: 'linkedin', value: 'linkedin.com/in/jagannathsaha04', href: 'https://linkedin.com/in/jagannathsaha04' },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-[860px] mx-auto px-8 py-20">
      <SectionHeader label="contact" />
      <div className="flex flex-col gap-0.5">
        {links.map(({ label, value, href }) => (
          <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
            className="flex items-center gap-3 px-4 py-3 rounded-md no-underline text-[#c9d1d9]
              border border-transparent hover:bg-[#161b22] hover:border-[#30363d] transition-all duration-150">
            <span className="text-[#8b949e] text-[11px] w-16 shrink-0">{label}</span>
            <span className="text-[#58a6ff] text-[13px]">{value}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
