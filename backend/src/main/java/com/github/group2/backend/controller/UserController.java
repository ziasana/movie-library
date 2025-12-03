package com.github.group2.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public ResponseEntity<String> getUser(@AuthenticationPrincipal Object principal) {
        OAuth2User user = null;

        if (principal instanceof OAuth2User u) {
            user = u;
        } else if (principal instanceof OAuth2AuthenticationToken token) {
            user = token.getPrincipal();
        }

        if (user != null) {
            String login = user.getAttribute("login");
            if (login != null) {
                return ResponseEntity.ok(login);
            }
        }

        return ResponseEntity.badRequest().build();
    }


}
