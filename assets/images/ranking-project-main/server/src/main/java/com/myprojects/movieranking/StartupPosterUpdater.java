package com.myprojects.movieranking;

import com.myprojects.movieranking.service.PosterService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StartupPosterUpdater implements ApplicationRunner {

    private final PosterService posterService;

    @Override
    public void run(ApplicationArguments args) {
        posterService.updateMissingPosters();
    }
}

