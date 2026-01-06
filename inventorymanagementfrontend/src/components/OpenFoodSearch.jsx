import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {
    addProduct,
    fetchProductInfo,
    getAllCarbohydrateProducts, getAllDrinksProducts,
    getAllProducts,
    getAllProteinsProducts, getAllSnacksProducts
} from "../api/ProductAPICalls";
import {CardActions, Fab, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {NutritionInfoOpenFoodFacts} from "./NutritionInfo";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

export function FoodSearch({productsToUpdate}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [shouldSubmit, setShouldSubmit] = useState(false);

   const [product, setProduct] = useState({
        name: "",
        image: "",
        stock: 1,
        carbohydrates: "",
        protein: "",
        fat: "",
        sugar: "",
        salt: ""
    })

    function handleSubmit(product) {

       //Aktiviert useEffect()
       setShouldSubmit(true);

       //Setzt das Produkt
        setProduct({
            name: product.name,
            image: product.image,
            carbohydrates: product.nutriments.carbohydrates_100g,
            protein: product.nutriments.proteins_100g,
            fat: product.nutriments.fat_100g,
            sugar: product.nutriments.sugars_100g,
            salt: product.nutriments.salt_100g})
    }


    const search = async () => {
        const products = await fetchProductInfo(query);
        console.log(products);
        setResults(products ?? []);
    }

    useEffect( () => {

        if (!shouldSubmit) {
            return;
        }

        const parsedProduct = {
            name: product.name,
            category: "",
            stock: 1,
            imgName: product.image,
            caloriesPerUnit: 200,
            carbsPerUnit: parseFloat(product.carbohydrates),
            proteinsPerUnit: parseFloat(product.protein),
            fatsPerUnit: parseFloat(product.fat),
            sugarsPerUnit: parseFloat(product.sugar),
            saltsPerUnit: parseFloat(product.salt)
        }

        async function addParsedProductProduct() {
            await addProduct({parsedProduct});
            let result = await getAllProducts();
            productsToUpdate(result);
        }

        addParsedProductProduct();
    }, [shouldSubmit]);

    return (
        <div style={{padding: "20px"}}>
            <TextField label="Outlined" value={query} placeholder="z. B. Banane, Käse, Pizza"
                       onChange={(e) => setQuery(e.target.value)}/>

            <Button onClick={search}>Suchen</Button>
            <ul>
                {results.map((p) => (
                    <Card sx={{maxWidth: 345}} style={{borderRadius: "10px"}} key={p.id}>
                        <CardMedia
                            component="img"
                            alt="Spaghetti"
                            height="140"
                            src={p.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={"span"}>
                                {p.name}
                            </Typography>
                            <NutritionInfoOpenFoodFacts product={p.nutriments}/>
                        </CardContent>
                        <CardActions className="CardButtons">
                            <Fab color="primary" aria-label="addProduct" id="addProductButton" onClick={() => handleSubmit(p)}>
                                <AddIcon/>
                            </Fab>
                        </CardActions>
                    </Card>
                ))}
            </ul>
        </div>
    );
}