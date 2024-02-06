package com.ezequielbolzi.AssignmentSumbission.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final static String SECRET_KEY =    "4K98XiUWxsQNmrMhTCxcBWo7bdQh1Hcj4+DkFWP7fsX7CYxhO3vtdQzNmsjq/NghgF+xn3HpJanPhUkaVgkqrCddOazbQADcmP57FsF/5kc3PCXOuDWhHd4+nD40faWVHs/odtdosWGjyThSjKNz0dl007ZD8lZ/EbDE1gxTyOtf1Y2lI43c1yhcAdtbtmUIPB3E/0ym1ZchLnS624I7NkWYkMKhwHr3kYf1KlUiIL2fwTryzj4X11TRaaz3JoKmytrdWR1HkrQ8i+lsD3fsrQz5itlqroSqKIgT5VjkuqAvezCMVhqwVTjJl4KZmi97cctBRL4nicaIP2UFsBU0G71Y2BDWRRHOUFSEyqkAQpk=\n";
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public  String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }
    public  String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 30 * 24 * 60 * 60 ))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (userDetails!= null && username.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extracAllClaims(token);
        return claimsResolver.apply(claims);
    }



    private Claims extracAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private static Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
