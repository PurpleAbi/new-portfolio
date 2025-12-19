package com.myprojects.movieranking.model;

public record MovieDTO(
        Long id,
        String title,
        String abisReview,
        Integer abisRating,
        Integer yearAbiReviewed,
        String sequel,
        String posterUrl
) { public MovieDTO(MovieEntity movie) {
    this(movie.getId(), movie.getTitle(), movie.getAbisReview(),
            movie.getAbisRating(), movie.getYearAbiReviewed(), movie.getSequel(), movie.getPosterUrl());
    }
}
