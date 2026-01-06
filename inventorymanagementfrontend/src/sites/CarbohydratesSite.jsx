import {openNav, SideBar} from "../components/Sidebar";
import {FoodCard} from "../components/FoodCard";
import React, {useEffect, useState} from "react";
import {getAllCarbohydrateProducts} from "../api/ProductAPICalls";
import {AddProductDialog} from "../components/AddProductDialog";
import {CreateMealDialog} from "../components/CreateMealDialog";

export function CarbohydratesSite() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const result = await getAllCarbohydrateProducts();
            setProducts(result);
        }

        loadProducts();
    }, []);

    if (products.length === 0) {
        return (
            <div id="main" className="App">
                <header className="App-header">
                    <span id="navTab" style={{fontsize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span>
                    <p id="title">
                        Bitte warte kurz
                    </p>
                    <AddProductDialog productsToUpdate={setProducts}/>
                </header>
            </div>
        );
    }
    return (
        <div id="main" className="App">
            <header className="App-header">
                <span id="navTab" style={{fontsize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span>
                <p id="title">
                    Kohlenhydrate
                </p>
                <AddProductDialog productsToUpdate={setProducts}/>
            </header>
            <div id="createMealButton" className="createMealButton">
                <CreateMealDialog productsToUpdate={setProducts} products={products}/>
            </div>
            <ShowAllCarbohydratesFoodCards products={products}/>
        </div>
    )
}

function ShowAllCarbohydratesFoodCards({products}) {
    const productFoodCards = products.map(product =>
        <FoodCard product={product}/>
    );
    return (
        <div className="content">
            <SideBar/>
            <div className="foodElements">
                {productFoodCards}
            </div>
        </div>
    );
}