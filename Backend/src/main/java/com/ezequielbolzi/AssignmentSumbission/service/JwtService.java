package com.ezequielbolzi.AssignmentSumbission.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    private final static String SECRET_KEY =    "4K98XiUWxsQNmrMhTCxcBWo7bdQh1Hcj4+DkFWP7fsX7CYxhO3vtdQzNmsjq/NghgF+xn3HpJanPhUkaVgkqrCddOazbQADcmP57FsF/5kc3PCXOuDWhHd4+nD40faWVHs/odtdosWGjyThSjKNz0dl007ZD8lZ/EbDE1gxTyOtf1Y2lI43c1yhcAdtbtmUIPB3E/0ym1ZchLnS624I7NkWYkMKhwHr3kYf1KlUiIL2fwTryzj4X11TRaaz3JoKmytrdWR1HkrQ8i+lsD3fsrQz5itlqroSqKIgT5VjkuqAvezCMVhqwVTjJl4KZmi97cctBRL4nicaIP2UFsBU0G71Y2BDWRRHOUFSEyqkAQpk=\n";
    private static final long EXPIRATION_TIME_SECONDS = 60 * 24 * 60 * 60; // 60 days

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", userDetails.getAuthorities()
                .stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList()));

        String token = generateToken(claims, userDetails);
        logger.info("Generated Token: {}", token);
        return token;
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expiration = new Date(System.currentTimeMillis() + EXPIRATION_TIME_SECONDS * 1000);

        String token = Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();

        logger.info("Generated Token with expiration: {}", expiration);
        return token;
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        boolean isValid = (userDetails != null && username.equals(userDetails.getUsername())) && !isTokenExpired(token);

        if (!isValid) {
            logger.warn("Token validation failed for user: {}", userDetails.getUsername());
        }

        return isValid;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extracAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extracAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private static Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
