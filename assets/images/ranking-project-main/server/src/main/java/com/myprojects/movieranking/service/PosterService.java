package com.myprojects.movieranking.service;

import com.myprojects.movieranking.model.*;
import com.myprojects.movieranking.repository.MoviesRepository;
import com.myprojects.movieranking.repository.SeriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class PosterService {
    @Value("${external.api.url}")
    private String URL;
    @Value("${external.api.key}")
    private String API_KEY;
    private final SeriesRepository seriesRepository;
    private final MoviesRepository moviesRepository;
    private final ExternalApiFetcher externalApiFetcher;

    private static final Logger logger = LoggerFactory.getLogger(PosterService.class);

    public void updateMissingPosters() {
        List<MovieEntity> movies = moviesRepository.findByPosterUrlIsNull();
        List<SeriesEntity> series = seriesRepository.findByPosterUrlIsNull();

        // process series first, then movies
        processEntities(series,
                SeriesEntity::getTitle,
                SeriesEntity::setPosterUrl,
                seriesRepository::save);

        processEntities(movies,
                MovieEntity::getTitle,
                MovieEntity::setPosterUrl,
                moviesRepository::save);
    }

    private <T> void processEntities(List<T> items,
                                     Function<T, String> titleGetter,
                                     BiConsumer<T, PosterUrlData> setter,
                                     Consumer<T> saver) {
        if (items == null || items.isEmpty()) {
            return;
        }

        for (T item : items) {
            String title = titleGetter.apply(item);
            if (title == null || title.isBlank()) {
                continue;
            }

            String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
            String completeUrl = URL + encodedTitle + API_KEY;
            try {
                String jsonResponse = externalApiFetcher.getJson(completeUrl);
                PosterUrlData posterUrl = externalApiFetcher.convertData(jsonResponse, PosterUrlData.class);
                if (posterUrl != null) {
                    setter.accept(item, posterUrl);
                    saver.accept(item);
                }
            } catch (Exception e) {
                logger.warn("Failed to fetch/save poster for '{}' : {}", title, e.getMessage());
            }
        }
    }

}
