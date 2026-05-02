# Jagannath Saha — Portfolio

A minimalist, terminal-inspired developer portfolio built with **Next.js 14** (App Router, TypeScript, Tailwind CSS).

---

## Project Structure

```
portfolio/
├── frontend/              # Next.js 14 App Router
│   ├── app/
│   │   ├── api/
│   │   │   └── repos/     # Next.js API route to fetch & rank repos
│   │   │       └── route.ts
│   │   ├── layout.tsx     # Root layout + metadata
│   │   └── page.tsx       # Single-page composition
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── TypingText.tsx  # Typing animation
│   │   ├── ProjectsList.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── GithubSection.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── lib/
│   │   ├── projects.ts    # Project data + types
│   │   └── github.ts      # Repo fetch + timeAgo util
│   ├── styles/
│   │   └── globals.css
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── package.json
```

---

## Running the Project

### Prerequisites
- Node.js 18+

---

### Start the Next.js Frontend

```bash
cd portfolio/frontend
npm install
npm run dev
```

Opens at **http://localhost:3000**

**Optional:** Set a GitHub token to avoid rate limits:
```bash
export GITHUB_TOKEN=ghp_yourtoken
npm run dev
```

---

## API Design

### `GET /api/repos` Response Shape

```json
[
  {
    "id": 123456789,
    "name": "learnlite",
    "description": "Offline AI tutoring platform",
    "html_url": "https://github.com/jagannathsaha04/learnlite",
    "stargazers_count": 12,
    "language": "Python",
    "updated_at": "2024-04-15T10:30:00Z",
    "score": 46.8
  }
]
```

### Ranking Algorithm

```
score = (stars × 3) + recencyScore
recencyScore = max(0, 10 - (daysSinceUpdate / 30))
```

- A repo updated today with 0 stars scores ~10
- A repo with 5 stars updated last week scores ~18
- Repos not updated in 10 months get no recency bonus

---

## Design Decisions

| Decision | Rationale |
|---|---|
| Single-page layout | Portfolio is a scanning experience, not navigation |
| Terminal aesthetic | Reflects developer identity; no gratuitous UI |
| Next.js API Route | Replaced Spring Boot to minimize infrastructure and unify the tech stack |
| Next.js fetch caching | GitHub API has rate limits; repos don't change frequently |
| No database | Portfolio data is static; over-engineering would be dishonest |
| SSE in LearnLite | Simpler than WebSockets for unidirectional LLM streaming |

---

## Production Deployment

**Frontend:** Vercel (zero config for Next.js)
```bash
cd frontend
vercel deploy
```

Set env var `GITHUB_TOKEN` on your hosting platform for higher GitHub API rate limits.
