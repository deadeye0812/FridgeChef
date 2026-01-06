package org.fitness.inventoryservice.repository;

import org.fitness.inventoryservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String name);
    boolean existsByName(String name);
    void deleteByName(String name);
    List<Product> findByCategory(String category);

    Product getProductByName(String name);

    Product getProductImgById(Long id);
}
