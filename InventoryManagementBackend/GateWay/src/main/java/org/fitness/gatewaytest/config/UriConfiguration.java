package org.fitness.gatewaytest.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties
public class UriConfiguration {

    private String inventoryServiceUri = "http://localhost:8082";

    private String productServiceUri = "http://localhost:8081";

    private String aiServiceUri = "http://localhost:8083";

    public String getAiServiceUri() {
        return aiServiceUri;
    }

    public void setAiServiceUri(String aiServiceUri) {
        this.aiServiceUri = aiServiceUri;
    }

    public String getInventoryServiceUri() {
        return inventoryServiceUri;
    }

    public void setInventoryServiceUri(String inventoryServiceUri) {
        this.inventoryServiceUri = inventoryServiceUri;
    }

    public String getProductServiceUri() {
        return productServiceUri;
    }

    public void setProductServiceUri(String productServiceUri) {
        this.productServiceUri = productServiceUri;
    }
}
