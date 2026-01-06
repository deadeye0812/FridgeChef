package org.fitness.inventoryservice.services;

import org.fitness.inventoryservice.model.Product;
import org.fitness.inventoryservice.repository.ProductRepository;
import org.fitness.inventoryservice.service.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.verify;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository  productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProducts() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product product2 = new Product("Test2", "Fat", 36.5f);

        given(productRepository.findAll()).willReturn(List.of(product1, product2));

        List<Product> products = productService.getAllProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findAll();
    }

    @Test
    void getAllProteinProducts() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product product2 = new Product("Test2", "Fat", 36.5f);
        Product product3 = new Product("Test3", "Protein", 125.8f);

        given(productRepository.findByCategory("Protein")).willReturn(List.of(product1, product3));

        List<Product> products = productService.getAllProteinProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findByCategory("Protein");
    }

    @Test
    void getAllCarbohydrateProducts() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product product2 = new Product("Test2", "Carbohydrate", 36.5f);
        Product product3 = new Product("Test3", "Carbohydrate", 125.8f);

        given(productRepository.findByCategory("Carbohydrate")).willReturn(List.of(product2, product3));

        List<Product> products = productService.getAllCarbohydrateProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findByCategory("Carbohydrate");
    }

    @Test
    void getAllFatProducts() {
        Product product1 = new Product("Test", "Fat", 125.8f);
        Product product2 = new Product("Test2", "Protein", 125.8f);
        Product product3 = new Product("Test3", "Carbohydrate", 125.8f);
        Product product4 = new Product("Test4", "Fat", 125.8f);

        given(productRepository.findByCategory("Fat")).willReturn(List.of(product1, product4));

        List<Product>  products = productService.getAllFatProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findByCategory("Fat");
    }

    @Test
    void getAllDrinksProducts() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product product2 = new Product("Test2", "Drink", 125.8f);
        Product product3 = new Product("Test3", "Drink", 125.8f);

        given(productRepository.findByCategory("Drink")).willReturn(List.of(product2, product3));

        List<Product>  products = productService.getAllDrinkProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findByCategory("Drink");
    }

    @Test
    void getAllSnacksProducts() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product product2 = new Product("Test2", "Snack", 125.8f);
        Product product3 = new Product("Test3", "Snack", 125.8f);

        given(productRepository.findByCategory("Snack")).willReturn(List.of(product2, product3));

        List<Product>  products = productService.getAllSnacksProducts();

        assertThat(products).hasSize(2);
        verify(productRepository).findByCategory("Snack");
    }

    @Test
    void updateProduct() {
        Product product1 = new Product("Test", "Protein", 125.8f);
        Product updateProduct = new Product("TestUpdate", "Protein", 125.9f);

        given(productRepository.findById(product1.getId())).willReturn(Optional.of(product1));

        productService.updateProduct(product1.getId(), updateProduct);

        assertThat(product1.getName()).isEqualTo(updateProduct.getName());

    }

    @Test
    void addProduct() {
        Product product = new Product("Test", "Protein", 125.8f);

        given(productRepository.save(product)).willReturn(product);

        productRepository.save(product);

        assertThat(productRepository.findById(product.getId())).isNotNull();
    }
}
