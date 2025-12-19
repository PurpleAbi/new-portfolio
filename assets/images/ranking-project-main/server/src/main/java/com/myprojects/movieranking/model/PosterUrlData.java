package com.myprojects.movieranking.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PosterUrlData(
        @JsonAlias("Poster") String posterUrl
) {
    public String poster() {
        return posterUrl;
    }
}
