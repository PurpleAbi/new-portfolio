package com.myprojects.movieranking.repository;

import com.myprojects.movieranking.model.MovieEntity;
import com.myprojects.movieranking.model.SeriesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeriesRepository extends JpaRepository<SeriesEntity, Integer> {

    List<SeriesEntity> findByYearAbiReviewed(Integer yearAbiReviewed);

    List<SeriesEntity> findTop3ByOrderByAbisRatingDesc();

    List<SeriesEntity> findByPosterUrlIsNull();

}
