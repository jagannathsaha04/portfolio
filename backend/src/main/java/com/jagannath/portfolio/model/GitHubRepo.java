package com.jagannath.portfolio.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubRepo {
    private Long id;
    private String name;
    private String description;

    @JsonProperty("html_url")
    private String htmlUrl;

    @JsonProperty("stargazers_count")
    private int stargazersCount;

    private String language;
    private boolean fork;
    private int size;

    @JsonProperty("updated_at")
    private String updatedAt;
}
