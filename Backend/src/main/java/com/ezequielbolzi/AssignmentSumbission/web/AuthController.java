package com.ezequielbolzi.AssignmentSumbission.web;

import com.ezequielbolzi.AssignmentSumbission.auth.BadCredentialsException;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.dto.AuthCredentialsRequest;
import com.ezequielbolzi.AssignmentSumbission.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            User user = (User) authenticate.getPrincipal();
            user.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtService.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            Boolean isValidToken = jwtService.isTokenValid(token, user);
            return ResponseEntity.ok(isValidToken);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }

    }
}