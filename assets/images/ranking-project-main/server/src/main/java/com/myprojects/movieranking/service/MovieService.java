package com.myprojects.movieranking.service;


import com.myprojects.movieranking.model.MovieDTO;
import com.myprojects.movieranking.model.MovieEntity;
import com.myprojects.movieranking.repository.MoviesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MoviesRepository moviesRepository;

    public List<MovieDTO> convertToDtoList(List<MovieEntity> movies) {
        return movies.stream()
                .map(m -> new MovieDTO(m.getId(), m.getTitle(), m.getAbisReview(),
                        m.getAbisRating(), m.getYearAbiReviewed(), m.getSequel(), m.getPosterUrl()))
                .toList();
    }

    public List<MovieDTO> getMoviesByYear(Integer year) {
        List<MovieEntity> movies = moviesRepository.findByYearAbiReviewed(year);
        return convertToDtoList(movies);
    }

    public List<MovieDTO> getTop3Movies() {
        List<MovieEntity> movies = moviesRepository.findTop3ByOrderByAbisRatingDesc();
        return convertToDtoList(movies);
    }


}
