package org.fitness.inventoryservice;

import org.fitness.inventoryservice.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class InventoryServiceApplicationTests {
    @Mock
    private ProductService productService;

    @Test
    void contextLoads() {
        assertTrue(true);
    }

    @Test
    void shouldGiveAllProductsBack() {

    }

}
