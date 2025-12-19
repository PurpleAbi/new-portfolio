package com.myprojects.movieranking.repository;

import com.myprojects.movieranking.model.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoviesRepository extends JpaRepository<MovieEntity,Integer> {

    List<MovieEntity> findByYearAbiReviewed(Integer yearAbiReviewed);

    List<MovieEntity> findTop3ByOrderByAbisRatingDesc();

    List<MovieEntity> findByPosterUrlIsNull();

}
