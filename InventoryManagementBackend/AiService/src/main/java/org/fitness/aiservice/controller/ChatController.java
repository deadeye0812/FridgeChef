package org.fitness.aiservice.controller;

import org.fitness.aiservice.model.Product;
import org.fitness.aiservice.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/gemini/")
public class ChatController {
    public MealService chatService;

    public ChatController(MealService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/greetGemini")
    public ResponseEntity<String> greetGemini() {
        return ResponseEntity.ok(chatService.greetGemini());
    }

    @PostMapping("/inventoryRecipes")
    public ResponseEntity<String> getRecipesForInventory(@RequestBody List<Product> products) {
        String resultRecipes = chatService.getResultRecipes(products);
        return ResponseEntity.ok().body(resultRecipes);
    }
}
