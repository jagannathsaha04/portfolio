# Jagannath Saha — Portfolio

A minimalist, terminal-inspired developer portfolio built with **Next.js 14** (App Router, TypeScript, Tailwind CSS) and a **Spring Boot** backend for the GitHub repos section.

---

## Project Structure

```
portfolio/
├── frontend/              # Next.js 14 App Router
│   ├── app/
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
│   ├── next.config.js     # Proxies /api/* → :8080
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/               # Spring Boot 3.2, Java 21
    └── src/main/java/com/jagannath/portfolio/
        ├── PortfolioApplication.java
        ├── controller/
        │   └── RepoController.java    # GET /api/repos
        ├── service/
        │   └── RepoService.java       # Filter + rank logic
        ├── client/
        │   └── GitHubClient.java      # GitHub REST API calls
        ├── model/
        │   ├── GitHubRepo.java        # Raw GitHub API shape
        │   └── RepoResponse.java      # Response DTO
        └── config/
            ├── WebConfig.java         # CORS
            └── CacheConfig.java       # Caffeine 1hr cache
```

---

## Running the Project

### Prerequisites
- Node.js 18+
- Java 21 + Maven 3.9+

---

### 1. Start the Spring Boot Backend

```bash
cd portfolio/backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**

**Optional:** Set a GitHub token to avoid rate limits:
```bash
export GITHUB_TOKEN=ghp_yourtoken
mvn spring-boot:run
```

**Endpoint:**
```
GET http://localhost:8080/api/repos
```
Returns top repos (no forks, no empty), ranked by stars × 3 + recency score, cached for 1 hour.

---

### 2. Start the Next.js Frontend

```bash
cd portfolio/frontend
npm install
npm run dev
```

Opens at **http://localhost:3000**

`next.config.js` proxies all `/api/*` requests to `http://localhost:8080/api/*` automatically — no CORS issues in development.

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
| Spring Boot backend | Only where meaningful: caching, ranking, token auth |
| `next.config.js` proxy | Avoids CORS config in dev; matches prod reverse-proxy pattern |
| Caffeine cache (1hr) | GitHub API has rate limits; repos don't change frequently |
| No database | Portfolio data is static; over-engineering would be dishonest |
| SSE in LearnLite | Simpler than WebSockets for unidirectional LLM streaming |

---

## Production Deployment

**Frontend:** Vercel (zero config for Next.js)
```bash
vercel deploy
```

**Backend:** Railway / Render / any JVM host
```bash
mvn clean package
java -jar target/portfolio-1.0.0.jar
```

Set env var `GITHUB_TOKEN` on your hosting platform for higher GitHub API rate limits.

Update `CORS` origins in `WebConfig.java` and `RepoController.java` to your production domain.
