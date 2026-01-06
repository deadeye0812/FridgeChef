package org.fitness.openfoodfactsservice.controller;

import org.fitness.openfoodfactsservice.service.OpenFoodFactsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/food")
public class OpenFoodFactsController {

    private final OpenFoodFactsService foodSearchService;

    public OpenFoodFactsController(OpenFoodFactsService foodSearchService) {
        this.foodSearchService = foodSearchService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam String q) {
        try {
            String json = foodSearchService.searchFoods(q);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
