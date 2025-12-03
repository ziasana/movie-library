package com.github.group2.backend.service;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.repository.MovieRepository;
import com.github.group2.backend.util.MovieMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;


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
                .map((MovieMapper::movieToMovieDto))
                .toList();
    }

    public MovieDTO getMovieByPublicId(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return MovieMapper.movieToMovieDto(movie);
    }

    public Movie saveMovie(MovieDTO movieDTO) {
        Movie newMovie = new Movie(movieDTO.title(), movieDTO.genre());
        return movieRepository.save(newMovie);
    }

    public void deleteMovie(String publicId) {
        movieRepository.deleteById(publicId);
    }

    public Movie updateMovie(String id,  MovieDTO movieDto) {
      return movieRepository.findById(id).map(
              currentMovie -> {
                  currentMovie.setTitle(movieDto.title());
                  currentMovie.setGenre(movieDto.genre());
                  return movieRepository.save(currentMovie);
              })
              .orElseThrow(() -> new NoSuchElementException("no movie with id " + id + " found"));


    }

}
