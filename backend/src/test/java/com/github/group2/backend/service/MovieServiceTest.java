package com.github.group2.backend.service;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


class MovieServiceTest {

    private final MovieRepository movieRepository = Mockito.mock(MovieRepository.class);
    private final MovieService movieService = new MovieService(movieRepository);

    @Test
    void getAllMovies_shouldReturnMappedDTOs() {
        // GIVEN
        Movie movie = new Movie("1", "1","Inception", "Sci-Fi");
        when(movieRepository.findAll()).thenReturn(List.of(movie));

        // WHEN
        List<MovieDTO> result = movieService.getAllMovies();

        // THEN
        assertEquals(1, result.size());
        assertEquals("Inception", result.getFirst().title());
        assertEquals("Sci-Fi", result.getFirst().genre());
    }
}