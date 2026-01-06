import {openNav, SideBar} from "../components/Sidebar";
import {FoodCard} from "../components/FoodCard";
import React, {useEffect, useState} from "react";
import {getAllProducts} from "../api/ProductAPICalls";
import {AddProductDialog} from "../components/AddProductDialog";
import {CreateMealDialog} from "../components/CreateMealDialog";

export function ProductsSite() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const result = await getAllProducts();
            setProducts(result);
        }

        loadProducts();
    }, []);

    if (products.length === 0) {
        return (
            <div id="main" className="App">
                <header className="App-header">
                    <span id="navTab" style={{fontSize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span>
                    <p id="title">Bitte warte kurz</p>
                    <AddProductDialog/>
                </header>
            </div>
        );
    }

    return (
        <div id="main" className="App">
            <header className="App-header">
                <span id="navTab" style={{fontSize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span>
                <p id="title">Alle Lebensmittel</p>
                <AddProductDialog productsToUpdate={setProducts}/>
            </header>
            <div id="createMealButton" className="createMealButton">
                <CreateMealDialog productsToUpdate={setProducts} products={products}/>
            </div>
            <ShowAllFoodCards products={products} setProducts={setProducts}/>
        </div>
    );
}


function ShowAllFoodCards({products, setProducts}) {
    const productFoodCards = products.map(product =>
        <FoodCard product={product} key={product.id} setProducts={setProducts}/>
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