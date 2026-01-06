import {useEffect, useState} from "react";

export async function getAllProducts() {
    const response = await fetch("http://localhost:8080/api/products/getAllProducts");
    return response.json();
}

export async function getAllCarbohydrateProducts() {
    const response = await fetch("http://localhost:8080/api/products/getAllCarbohydrateProducts");
    return response.json();
}

export async function getAllDrinksProducts() {
    const response = await fetch("http://localhost:8080/api/products/getAllDrinkProducts");
    return response.json();
}

export async function getAllProteinsProducts() {
    const response = await fetch("http://localhost:8080/api/products/getAllProteinProducts");
    return response.json();
}

export async function getAllSnacksProducts() {
    const response = await fetch("http://localhost:8080/api/products/getAllSnacksProducts");
    return response.json();
}

export function getAllProductImages() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/products/getAllProductImages")
            .then((res) => res.json())
            .then((json) => {
                setImages(json);
            });
    }, []);

    return images;
}

export async function addProduct(product) {
    const response = await fetch("http://localhost:8080/api/products/addProduct", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product.parsedProduct)
    });
    return response.json();
}

export async function createMeals(products) {
    const response = await fetch("http://localhost:8080/api/gemini/inventoryRecipes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(products.products)
    });
    return response.json();
}

export async function updateProduct(product) {
    const response = await fetch(`http://localhost:8080/api/products/updateProduct/${product.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    });
    return response.json();
}

export async function deleteProduct(product) {
    const response = await fetch(`http://localhost:8080/api/products/deleteProduct/${product.id}`, {
        method: "DELETE",
    });
    return response.ok;
}

export async function fetchProductInfo(query) {
    const response = await fetch(`http://localhost:8080/api/food/search?q=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&fields=product_name,image_front_url,nutriments`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.products)) {
        return [];
    }

    return data.products
        .filter(product => product.nutriments)
        .map(p => ({
            name: p.product_name,
            image: p.image_front_url ?? null,
            nutriments: {
                energy_100g: p.nutriments.energy_100g ?? null,
                fat_100g: p.nutriments.fat_100g ?? null,
                carbohydrates_100g: p.nutriments.carbohydrates_100g ?? null,
                sugars_100g: p.nutriments.sugars_100g ?? null,
                proteins_100g: p.nutriments.proteins_100g ?? null,
                salt_100g: p.nutriments.salt_100g ?? null
            }
        }));
}