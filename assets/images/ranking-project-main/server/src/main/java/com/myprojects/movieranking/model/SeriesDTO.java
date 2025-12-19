package com.myprojects.movieranking.model;

public record SeriesDTO(
        Long id,
        String title,
        String abisReview,
        Integer abisRating,
        Integer yearAbiReviewed,
        Boolean ongoing,
        String posterUrl
) { public SeriesDTO(SeriesEntity series) {
    this(series.getId(), series.getTitle(), series.getAbisReview(),
            series.getAbisRating(), series.getYearAbiReviewed(), series.getOngoing(), series.getPosterUrl());
    }
}
