import {openNav, SideBar} from "../components/Sidebar";
import {FoodCard} from "../components/FoodCard";
import React, {useEffect, useState} from "react";
import {getAllSnacksProducts} from "../api/ProductAPICalls";
import {AddProductDialog} from "../components/AddProductDialog";
import {CreateMealDialog} from "../components/CreateMealDialog";

export function SnacksSite() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const result = await getAllSnacksProducts();
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
                    <AddProductDialog/>
                </header>
            </div>
        );
    }
    return (
        <div id="main" className="App">
            <header className="App-header">
                <span id="navTab" style={{fontsize: '30px', cursor: 'pointer'}} onClick={openNav}>&#9776;</span>
                <p id="title">
                    Snacks
                </p>
                <AddProductDialog productsToUpdate={setProducts}/>
            </header>
            <div id="createMealButton" className="createMealButton">
                <CreateMealDialog productsToUpdate={setProducts} products={products}/>
            </div>
            <ShowAllSweetsFoodCards products={products} setProducts={setProducts}/>
        </div>
    )
}

function ShowAllSweetsFoodCards({products, setProducts}) {
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