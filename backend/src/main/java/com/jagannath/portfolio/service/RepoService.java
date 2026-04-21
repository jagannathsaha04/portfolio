package com.jagannath.portfolio.service;

import com.jagannath.portfolio.client.GitHubClient;
import com.jagannath.portfolio.model.GitHubRepo;
import com.jagannath.portfolio.model.RepoResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RepoService {

    private final GitHubClient gitHubClient;

    public RepoService(GitHubClient gitHubClient) {
        this.gitHubClient = gitHubClient;
    }

    @Cacheable("repos")
    public List<RepoResponse> getTopRepos() {
        return gitHubClient.fetchAllRepos().stream()
                .filter(r -> !r.isFork())           // exclude forks
                .filter(r -> r.getSize() > 0)        // exclude empty repos
                .map(this::toResponse)
                .sorted(Comparator.comparingDouble(RepoResponse::getScore).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    private RepoResponse toResponse(GitHubRepo repo) {
        double recencyScore = computeRecencyScore(repo.getUpdatedAt());
        double score = (repo.getStargazersCount() * 3.0) + recencyScore;

        return RepoResponse.builder()
                .id(repo.getId())
                .name(repo.getName())
                .description(repo.getDescription())
                .htmlUrl(repo.getHtmlUrl())
                .stargazersCount(repo.getStargazersCount())
                .language(repo.getLanguage())
                .updatedAt(repo.getUpdatedAt())
                .score(score)
                .build();
    }

    /**
     * Recency score: repos updated recently get higher weight.
     * Scale: 0 (very old) → ~10 (updated today)
     */
    private double computeRecencyScore(String updatedAt) {
        if (updatedAt == null) return 0;
        long daysSince = (Instant.now().toEpochMilli()
                - Instant.parse(updatedAt).toEpochMilli()) / 86_400_000L;
        return Math.max(0, 10.0 - (daysSince / 30.0));
    }
}
