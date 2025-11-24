package com.github.group2.backend.service;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.repository.MovieRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<MovieDTO> getAllMovies() {
        return movieRepository
                .findAll()
                .stream()
                .map(movie -> new MovieDTO(
                        movie.getTitle(),
                        movie.getGenre()
                ))
                .toList();
    }
}
