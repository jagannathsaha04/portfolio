'use client'
import { useEffect, useState } from 'react'
import { Repo, fetchRepos, timeAgo } from '@/lib/github'
import { SectionHeader } from './ProjectsList'

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="github" className="max-w-[860px] mx-auto px-8 py-20">
      <SectionHeader label="github" />

      <div className="flex items-center gap-2 text-[12px] text-[#8b949e] mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block animate-pulse" />
        fetching from Spring Boot backend → GET /api/repos
      </div>

      <div className="border border-[#30363d] rounded-lg overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center gap-2 px-5 py-4 text-[12px] text-[#8b949e]">
            fetching repositories
            <span className="flex gap-0.5">
              {[0,1,2].map(i => (
                <span key={i} className="text-[#58a6ff] animate-[loadblink_1.2s_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}>.</span>
              ))}
            </span>
          </div>
        )}
        {error && (
          <div className="px-5 py-4 text-[12px] text-[#f85149]">
            // error: could not reach backend. ensure Spring Boot is running on :8080
          </div>
        )}
        {!loading && !error && repos.map((r, i) => (
          <div key={r.id}
            className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#161b22] transition-colors
              ${i < repos.length - 1 ? 'border-b border-[#30363d]' : ''}`}>
            <a href={r.html_url} target="_blank"
              className="text-[#58a6ff] text-[13px] font-semibold flex-1 no-underline hover:underline min-w-0">
              {r.name}
            </a>
            <span className="text-[#8b949e] text-[11px] flex-[2] hidden sm:block truncate">
              {r.description ?? '—'}
            </span>
            <div className="flex items-center gap-4 text-[11px] text-[#8b949e] whitespace-nowrap">
              <span className="text-[#f0883e]">★ {r.stargazers_count}</span>
              <span>{r.language ?? '—'}</span>
              <span>{timeAgo(r.updated_at)}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-[#8b949e]">
        // filtered: no forks · no empty repos · ranked by stars + recency
      </p>
    </section>
  )
}
