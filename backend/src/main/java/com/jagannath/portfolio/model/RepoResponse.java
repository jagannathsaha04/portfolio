package com.jagannath.portfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RepoResponse {
    private Long id;
    private String name;
    private String description;

    @JsonProperty("html_url")
    private String htmlUrl;

    @JsonProperty("stargazers_count")
    private int stargazersCount;

    private String language;

    @JsonProperty("updated_at")
    private String updatedAt;

    private double score;
}
