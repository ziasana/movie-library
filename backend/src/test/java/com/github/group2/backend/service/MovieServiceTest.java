package com.github.group2.backend.service;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


class MovieServiceTest {

    private final MovieRepository movieRepository = Mockito.mock(MovieRepository.class);
    private final MovieService movieService = new MovieService(movieRepository);

    @Test
    void getAllMovies_shouldReturnMappedDTOs() {
        // GIVEN
        Movie movie = new Movie("1", "Inception", "Sci-Fi");
        when(movieRepository.findAll()).thenReturn(List.of(movie));

        // WHEN
        List<MovieDTO> result = movieService.getAllMovies();

        // THEN
        assertEquals(1, result.size());
        assertEquals("Inception", result.getFirst().title());
        assertEquals("Sci-Fi", result.getFirst().genre());
    }

    @Test
    void getMovieByPublicId_shouldReturnDTO() {
        Movie movie = new Movie("1", "Matrix", "Action");
        when(movieRepository.findById("1")).thenReturn(Optional.of(movie));

        MovieDTO result = movieService.getMovieByPublicId("1");

        assertEquals("Matrix", result.title());
        assertEquals("Action", result.genre());
    }

    @Test
    void getMovieByPublicId_shouldThrowNotFound_whenMissing() {
        when(movieRepository.findById("999")).thenReturn(Optional.empty());

        ResponseStatusException ex =
                assertThrows(ResponseStatusException.class,
                        () -> movieService.getMovieByPublicId("999"));

        assertEquals(404, ex.getStatusCode().value());
    }

    @Test
    void saveMovie_shouldCreateAndSaveMovie() {
        MovieDTO dto = new MovieDTO(null, "Interstellar", "Sci-Fi");
        Movie savedMovie = new Movie("1", "Interstellar", "Sci-Fi");

        when(movieRepository.save(any(Movie.class))).thenReturn(savedMovie);

        Movie result = movieService.saveMovie(dto);

        assertEquals("Interstellar", result.getTitle());
        assertEquals("Sci-Fi", result.getGenre());
        verify(movieRepository, times(1)).save(any(Movie.class));
    }

    @Test
    void deleteMovie_shouldCallRepository() {
        String publicId = "1";
        movieService.deleteMovie(publicId);
        verify(movieRepository, times(1)).deleteById(publicId);
        verifyNoMoreInteractions(movieRepository);
    }

}