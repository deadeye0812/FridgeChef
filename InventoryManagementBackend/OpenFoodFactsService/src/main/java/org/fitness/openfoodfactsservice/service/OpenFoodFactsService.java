package org.fitness.openfoodfactsservice.service;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class OpenFoodFactsService {
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String searchFoods(String query) throws Exception {
        String url = "https://world.openfoodfacts.org/cgi/search.pl"
                + "?search_terms=" + URLEncoder.encode(query, StandardCharsets.UTF_8)
                + "&search_simple=1&action=process&json=1";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("User-Agent", "FridgeChef/1.0")
                .GET()
                .build();

        HttpResponse<String> response =
                httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}
