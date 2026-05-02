import { NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  size: number;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch('https://api.github.com/users/jagannathsaha04/repos?per_page=100', {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('GitHub API error:', response.status, await response.text());
      return NextResponse.json([]); // Graceful fallback
    }

    const repos: GitHubRepo[] = await response.json();

    const filteredAndRanked = repos
      .filter((repo) => !repo.fork && repo.size > 0)
      .map((repo) => {
        const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
        const recencyScore = Math.max(0, 10 - (daysSinceUpdate / 30));
        const score = (repo.stargazers_count * 3) + recencyScore;
        
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          updated_at: repo.updated_at,
          score
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return NextResponse.json(filteredAndRanked);
  } catch (error) {
    console.error('Error in /api/repos:', error);
    return NextResponse.json([]); // Graceful fallback
  }
}
