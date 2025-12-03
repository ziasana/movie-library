package com.github.group2.backend.controller;

import com.github.group2.backend.dto.MovieDTO;
import com.github.group2.backend.entity.Movie;
import com.github.group2.backend.service.MovieService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(controllers = MovieController.class, excludeAutoConfiguration = {OAuth2ClientAutoConfiguration.class})
class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MovieService movieService;

    @Test
    void getAllMovies_shouldReturnListOfMovies() throws Exception {
        MovieDTO response = new MovieDTO("1", "Movie 1", "Arthouse");
        when(movieService.getAllMovies()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/movies")).andExpect(status().isOk()).andExpect(content().json("""
                [
                    {"title": "Movie 1","genre": "Arthouse"}
                ]
                """));
    }

    @Test
    void getMovieByPublicId_shouldReturnMovie() throws Exception {
        MovieDTO response = new MovieDTO("1", "Movie 1", "Arthouse");
        when(movieService.getMovieByPublicId("1")).thenReturn(response);

        mockMvc.perform(get("/api/movies/1")).andExpect(status().isOk()).andExpect(content().json("""
                {"title": "Movie 1","genre": "Arthouse"}
                """));
    }

    @Test
    void deleteMovie_shouldDeleteMovie() throws Exception {
        String publicId = "abc123";

        mockMvc.perform(delete("/api/movies/{publicId}", publicId)).andExpect(status().isNoContent());

        verify(movieService).deleteMovie(publicId);
    }

    @Test
    void addMovie_shouldReturnSavedMovie() throws Exception {
        MovieDTO request = new MovieDTO(null, "New Movie", "Action");
        Movie savedMovie = new Movie();
        savedMovie.setTitle("New Movie");
        savedMovie.setGenre("Action");

        when(movieService.saveMovie(request)).thenReturn(savedMovie);

        String requestJson = """
                {
                  "title": "New Movie",
                  "genre": "Action"
                }
                """;

        mockMvc.perform(post("/api/movies").contentType(MediaType.APPLICATION_JSON).content(requestJson)).andExpect(status().isOk()).andExpect(jsonPath("$.title").value("New Movie")).andExpect(jsonPath("$.genre").value("Action"));
    }

    @Test
    void updateMovie_shouldReturnUpdatedMovie() throws Exception {
        String id = "123";
        MovieDTO updateDto = new MovieDTO(id, "Updated Movie", "Action");
        Movie updatedMovie = new Movie(id, "Updated Movie", "Action");

        String requestJson = """
                {
                  "id": "123",
                  "title": "Updated Movie",
                  "genre": "Action"
                }
                """;

        when(movieService.updateMovie(id, updateDto)).thenReturn(updatedMovie);

        mockMvc.perform(put("/api/movies/{id}", id).contentType(MediaType.APPLICATION_JSON).content(requestJson)).andExpect(status().isOk()).andExpect(jsonPath("$.id").value("123")).andExpect(jsonPath("$.title").value("Updated Movie")).andExpect(jsonPath("$.genre").value("Action"));
    }
}
