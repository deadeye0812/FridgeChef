package org.fitness.inventoryservice.service;

import org.fitness.inventoryservice.model.Product;
import org.fitness.inventoryservice.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }


    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(updatedProduct.getName());
        product.setCategory(updatedProduct.getCategory());
        product.setStock(updatedProduct.getStock());
        product.setCaloriesPerUnit(updatedProduct.getCaloriesPerUnit());
        product.setCarbsPerUnit(updatedProduct.getCarbsPerUnit());
        product.setFatsPerUnit(updatedProduct.getFatsPerUnit());
        product.setProteinsPerUnit(updatedProduct.getProteinsPerUnit());
        product.setSugarsPerUnit(updatedProduct.getSugarsPerUnit());
        product.setSaltsPerUnit(updatedProduct.getSaltsPerUnit());
        repository.save(product);
        return product;
    }

    public Product saveProduct(Product product) {
        if (repository.existsByName(product.getName())) {
            throw new IllegalArgumentException("Product already exists");
        }
        return repository.save(product);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repository.findByNameContaining(keyword);
    }

    public List<Product> getAllCarbohydrateProducts() {
        return repository.findByCategory("Carbohydrate");
    }

    public List<Product> getAllProteinProducts() {
        return repository.findByCategory("Protein");
    }

    public List<Product> getAllFatProducts() {
        return repository.findByCategory("Fat");
    }

    public List<Product> getAllSnacksProducts() {
        return repository.findByCategory("Snack");
    }

    public List<Product> getAllDrinkProducts() {
        return repository.findByCategory("Drink");
    }

    public ResponseEntity<String> getProductsImgNameString(Long productId) {
        Product product = repository.getProductImgById(productId);
        if (product == null) {
            ResponseEntity.noContent().build();
        }
        assert product != null;
        return ResponseEntity.ok().body(product.getImgName());
    }

    public ResponseEntity<List<String>> getProductsImagesName() {
        List<String> productImages = new ArrayList<>();
        List<Product> products = repository.findAll();
        products.forEach(product -> {
            productImages.add(product.getImgName());
        });
        return ResponseEntity.ok().body(productImages);
    }

    public Product getProductDetailsByName(String name) {
        return repository.getProductByName(name);
    }
}