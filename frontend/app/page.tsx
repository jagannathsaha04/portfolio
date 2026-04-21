import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectsList from '@/components/ProjectsList'
import GithubSection from '@/components/GithubSection'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsList />
      <GithubSection />
      <About />
      <Contact />
      <footer className="border-t border-[#30363d] py-6 text-center text-[11px] text-[#8b949e] max-w-[860px] mx-auto px-8">
        // jagannath saha — built with next.js + spring boot
      </footer>
    </main>
  )
}
