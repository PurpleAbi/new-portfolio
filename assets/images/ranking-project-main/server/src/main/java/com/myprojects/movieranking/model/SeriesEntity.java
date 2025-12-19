package com.myprojects.movieranking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "series")
@Entity(name = "Series")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class SeriesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(name = "abis_review")
    private String abisReview;
    @Column(name = "abis_rating")
    private Integer abisRating;
    @Column(name = "year_abi_reviewed")
    private Integer yearAbiReviewed;
    private Boolean ongoing;
    @Column (name = "poster_url")
    private String posterUrl;

    public void setPosterUrl(PosterUrlData posterUrl) {
        this.posterUrl = posterUrl.poster();
    }
}
