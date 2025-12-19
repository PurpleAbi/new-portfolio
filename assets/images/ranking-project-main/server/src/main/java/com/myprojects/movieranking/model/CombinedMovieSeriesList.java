package com.myprojects.movieranking.model;

import java.util.List;

public record CombinedMovieSeriesList(
        List<MovieDTO> movies,
        List<SeriesDTO> series
) {
}
