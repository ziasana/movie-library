package com.github.group2.backend.controller;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<MovieDTO> getMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{publicId}")
    public MovieDTO getMovie(@PathVariable String publicId) {
        return movieService.getMovieByPublicId(publicId);
    }

    @PostMapping
    public Movie addMovie(@RequestBody MovieDTO movieDTO) {
        return movieService.saveMovie(movieDTO);
    }

    @DeleteMapping("/{publicId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMovie(@PathVariable String publicId) {
        movieService.deleteMovie(publicId);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable String id, @RequestBody MovieDTO movieDto) {
        return movieService.updateMovie(id, movieDto);
    }

}
