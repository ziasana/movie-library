package com.github.group2.backend.service;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.repository.MovieRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                        movie.getPublicId(),
                        movie.getTitle(),
                        movie.getGenre()
                ))
                .toList();
    }

    public MovieDTO getMovieByPublicId(String publicId) {

        Movie movie = movieRepository.findMovieByPublicId(publicId);
        if (movie == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Movie not found");
        }


       return new MovieDTO(
        movie.getPublicId(),
        movie.getTitle(),
        movie.getGenre()
       );
    }
}
