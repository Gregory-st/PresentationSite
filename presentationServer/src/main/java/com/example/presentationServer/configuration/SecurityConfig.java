package com.example.presentationServer.configuration;

import java.util.List;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  @Value("${frontend.urls}")
  private String hosts;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
            authManager -> authManager
                .anyRequest()
                .permitAll()
        )
        .build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    List<String> origins = Arrays.stream(hosts.split(","))
        .toList();
    List<String> methods = List.of("GET", "POST", "PUT");
    List<String> headers = List.of("Content-Type", "Cache-Control");

    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(origins);
    corsConfiguration.setAllowedMethods(methods);
    corsConfiguration.setAllowedHeaders(headers);

    UrlBasedCorsConfigurationSource configuration = new UrlBasedCorsConfigurationSource();
    configuration.registerCorsConfiguration("/**", corsConfiguration);

    return configuration;
  }
}
