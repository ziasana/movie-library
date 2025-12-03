package com.github.group2.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false) // deaktiviert Security
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void getUser_missingLogin_returnsBadRequest() throws Exception {
        OAuth2User user = new DefaultOAuth2User(
                null,
                Map.of("login", "githubUser"),
                "login"
        );


        mockMvc.perform(get("/api/users")
                        .with(SecurityMockMvcRequestPostProcessors.authentication(
                                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
                        )))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getUser_nullUser_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isBadRequest());
    }
}
