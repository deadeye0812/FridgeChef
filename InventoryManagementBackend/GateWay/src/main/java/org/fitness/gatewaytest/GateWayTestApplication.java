package org.fitness.gatewaytest;

import org.fitness.gatewaytest.config.UriConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@SpringBootApplication
@EnableConfigurationProperties(UriConfiguration.class)
@RestController
public class GateWayTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(GateWayTestApplication.class, args);
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder, UriConfiguration uriConfiguration) {
        String inventoryServiceUri = uriConfiguration.getInventoryServiceUri();
        String productServiceUri = uriConfiguration.getProductServiceUri();
        String aiServiceUri = uriConfiguration.getAiServiceUri();

        return builder.routes()
                .route(p -> p
                        .path("/api/gemini/inventoryRecipes")
                        .uri(aiServiceUri))
                .route(p -> p
                        .path("/api/gemini/greetGemini")
                        .uri(aiServiceUri))
                .route(p -> p
                        .path("/api/food/search")
                        .uri(productServiceUri))
                .route(p -> p
                        .path("/api/products/addProduct")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/deleteProduct/**")
                        .filters(rw -> rw.rewritePath("/api/products/deleteProduct/(?<id>.*)", "/api/products/deleteProduct/${id}"))
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/updateProduct/**")
                        .filters(rw -> rw.rewritePath("/api/products/updateProduct/(?<id>.*)", "/api/products/updateProduct/${id}"))
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllCarbohydrateProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllDrinkProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllProteinProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllFatProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllSnacksProducts")
                        .uri(inventoryServiceUri))
                .route(p -> p
                        .path("/api/products/getAllProductImages")
                        .uri(inventoryServiceUri))
                .build();
    }

    @RequestMapping("/fallback")
    public Mono<String> fallback() {
        return Mono.just("fallback");
    }
}