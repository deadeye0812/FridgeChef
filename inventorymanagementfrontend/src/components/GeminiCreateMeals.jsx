import * as React from "react";
import {useEffect, useState} from "react";
import {
    addProduct,
    createMeals,
    getAllCarbohydrateProducts,
    getAllDrinksProducts,
    getAllProducts,
    getAllProteinsProducts,
    getAllSnacksProducts
} from "../api/ProductAPICalls";
import {CardActions, Fab} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {NutritionInfo} from "./NutritionInfo";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";

export function CreateMeals({products, productsToUpdate}) {
    const [results, setResults] = useState([]);
    const [shouldSubmit, setShouldSubmit] = useState(false);


    const generate = async () => {
        const meals = await createMeals({products})
        console.log(meals);
        setResults(meals ?? []);
    }

    const handleSubmit = async () => {
        setShouldSubmit(true);
    }

    useEffect(() => {

        if (!shouldSubmit) {
            return;
        }

        async function addParsedProduct() {
            await addProduct({parsedProduct});

            let result;

            if (parsedProduct.category === "Protein") {
                result = await getAllProteinsProducts();
            } else if (parsedProduct.category === "Carbohydrate") {
                result = await getAllCarbohydrateProducts();
            } else if (parsedProduct.category === "Fat") {
                result = await getAllSnacksProducts();
            } else if (parsedProduct.category === "Drink") {
                result = await getAllDrinksProducts();
            } else {
                result = await getAllProducts();
            }

            productsToUpdate(result);
        }

        addParsedProduct();
    }, [shouldSubmit]);

    return (
        <div style={{padding: "20px"}} className="generateButton">
            <Button onClick={generate}>Generate</Button>
            <ul>
                {results.map((p) => (
                    <Card sx={{maxWidth: 345}} style={{borderRadius: "10px"}} key={p.id} className="foodElement">
                        <CardMedia
                            component="img"
                            alt="Picture not available"
                            height="140"
                            src={p.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={"span"}>
                                {p.name}
                            </Typography>
                            <NutritionInfo product={p}/>
                        </CardContent>
                        <CardActions className="justify-center">
                            <Fab color="primary" aria-label="add" id="addGeminiMealButton" onClick={() => handleSubmit}>
                                <AddIcon/>
                            </Fab>
                        </CardActions>
                    </Card>
                ))}
            </ul>
        </div>
    );
}