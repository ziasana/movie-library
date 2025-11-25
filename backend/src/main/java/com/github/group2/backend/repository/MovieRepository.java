package com.github.group2.backend.repository;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {

    Movie findMovieByPublicId(String publicId);
}
