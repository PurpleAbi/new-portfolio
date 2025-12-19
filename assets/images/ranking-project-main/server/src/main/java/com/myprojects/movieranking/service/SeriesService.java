package com.myprojects.movieranking.service;

import com.myprojects.movieranking.model.SeriesDTO;
import com.myprojects.movieranking.model.SeriesEntity;
import com.myprojects.movieranking.repository.SeriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeriesService {

    final SeriesRepository seriesRepository;

    public List<SeriesDTO> convertToDtoList(List<SeriesEntity> series) {
        return series.stream()
                .map(s -> new SeriesDTO( s.getId(), s.getTitle(), s.getAbisReview(),
                        s.getAbisRating(), s.getYearAbiReviewed(), s.getOngoing(), s.getPosterUrl()))
                .toList();
    }
    public List<SeriesDTO> getSeriesByYear(Integer year) {
        List<SeriesEntity> series = seriesRepository.findByYearAbiReviewed(year);
        return convertToDtoList(series);
    }

    public List<SeriesDTO> getTop3Series() {
        List<SeriesEntity> series = seriesRepository.findTop3ByOrderByAbisRatingDesc();
        return convertToDtoList(series);
    }
}
