package org.fitness.inventoryservice.controller;

import jakarta.validation.Valid;
import org.fitness.inventoryservice.model.Product;
import org.fitness.inventoryservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/getProductDetailsByName")
    public Product getProductDetailsByName(@RequestParam String name) {
        return productService.getProductDetailsByName(name);
    }

    @GetMapping("/getAllCarbohydrateProducts")
    public List<Product> getAllCarbohydrateProducts() {
        return productService.getAllCarbohydrateProducts();
    }

    @GetMapping("/getProductImg")
    public ResponseEntity<String> getProductImg(@RequestParam(value = "id") Long productId) {
        return productService.getProductsImgNameString(productId);
    }

    @GetMapping("/getAllProductImages")
    public ResponseEntity<List<String>> getAllProductImages() {
        return productService.getProductsImagesName();
    }

    @GetMapping("/getAllProteinProducts")
    public List<Product> getAllProteinProducts() {
        return productService.getAllProteinProducts();
    }

    @GetMapping("/getAllFatProducts")
    public List<Product> getAllFatProducts() {
        return productService.getAllFatProducts();
    }

    @GetMapping("/getAllSnacksProducts")
    public List<Product> getAllSnacksProducts() {
        return productService.getAllSnacksProducts();
    }

    @GetMapping("/getAllDrinkProducts")
    public List<Product> getAllDrinkProducts() {
        return productService.getAllDrinkProducts();
    }

    @PostMapping("/addProduct")
    public Product addProduct(@Valid @RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Long> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }
}
