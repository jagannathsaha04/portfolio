package com.jagannath.portfolio.client;

import com.jagannath.portfolio.model.GitHubRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Component
public class GitHubClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${github.api.base-url}")
    private String baseUrl;

    @Value("${github.username}")
    private String username;

    @Value("${github.token:}")
    private String token;

    public List<GitHubRepo> fetchAllRepos() {
        String url = baseUrl + "/users/" + username + "/repos?per_page=100&sort=updated&type=owner";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/vnd.github+json");
        headers.set("X-GitHub-Api-Version", "2022-11-28");
        if (token != null && !token.isBlank()) {
            headers.set("Authorization", "Bearer " + token);
        }

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<List<GitHubRepo>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<>() {}
        );

        return response.getBody() != null ? response.getBody() : Collections.emptyList();
    }
}
