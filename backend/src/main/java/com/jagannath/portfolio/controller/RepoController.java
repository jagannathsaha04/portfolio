package com.jagannath.portfolio.controller;

import com.jagannath.portfolio.model.RepoResponse;
import com.jagannath.portfolio.service.RepoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "https://jagannathsaha.dev"})
public class RepoController {

    private final RepoService repoService;

    public RepoController(RepoService repoService) {
        this.repoService = repoService;
    }

    /**
     * GET /api/repos
     * Returns top GitHub repositories for the configured user.
     * Filtered: no forks, no empty repos.
     * Ranked: by stars (weighted x3) + recency score.
     * Cached: 1 hour via Caffeine.
     */
    @GetMapping("/repos")
    public ResponseEntity<List<RepoResponse>> getRepos() {
        return ResponseEntity.ok(repoService.getTopRepos());
    }
}
