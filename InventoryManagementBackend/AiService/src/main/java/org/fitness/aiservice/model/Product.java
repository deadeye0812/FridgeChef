package org.fitness.aiservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Category is mandatory")
    private String category;
    private int stock;
    @NotBlank(message = "Calories Per Unit is mandatory")
    private float caloriesPerUnit;
    private float proteinsPerUnit;
    private float fatsPerUnit;
    private float carbsPerUnit;
    private float sugarsPerUnit;
    private float saltsPerUnit;
    private String imgName;

    protected Product() {}

    public Product(String name, String category, float caloriesPerUnit) {
        this.name = name;
        this.category = category;
        this.caloriesPerUnit = caloriesPerUnit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public float getCaloriesPerUnit() {
        return caloriesPerUnit;
    }

    public void setCaloriesPerUnit(float caloriesPerUnit) {
        this.caloriesPerUnit = caloriesPerUnit;
    }

    public float getProteinsPerUnit() {
        return proteinsPerUnit;
    }

    public void setProteinsPerUnit(float proteinsPerUnit) {
        this.proteinsPerUnit = proteinsPerUnit;
    }

    public float getFatsPerUnit() {
        return fatsPerUnit;
    }

    public void setFatsPerUnit(float fatsPerUnit) {
        this.fatsPerUnit = fatsPerUnit;
    }

    public float getCarbsPerUnit() {
        return carbsPerUnit;
    }

    public void setCarbsPerUnit(float carbsPerUnit) {
        this.carbsPerUnit = carbsPerUnit;
    }

    public float getSugarsPerUnit() {
        return sugarsPerUnit;
    }

    public void setSugarsPerUnit(float sugarsPerUnit) {
        this.sugarsPerUnit = sugarsPerUnit;
    }

    public float getSaltsPerUnit() {
        return saltsPerUnit;
    }

    public void setSaltsPerUnit(float saltsPerUnit) {
        this.saltsPerUnit = saltsPerUnit;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }
}
