import * as React from "react";
import {
    addProduct,
    getAllCarbohydrateProducts,
    getAllDrinksProducts,
    getAllProducts,
    getAllProteinsProducts,
    getAllSnacksProducts
} from "../api/ProductAPICalls";
import {Box, Fab, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {FoodSearch} from "./OpenFoodSearch";

export function AddProductDialog({productsToUpdate}) {
    const [manuelSwitch, setManuelSwitch] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [product, setProduct] = React.useState({
        name: "",
        category: "",
        stock: "",
        caloriesPerUnit: "",
        carbohydrates: "",
        protein: "",
        fat: "",
        sugar: "",
        salts: ""
    });

    const handleChange = (field) => (event) => {
        setProduct(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = async () => {
        const parsedProduct = {
            name: product.name,
            category: product.category,
            stock: parseInt(product.stock),
            caloriesPerUnit: parseFloat(product.caloriesPerUnit),
            carbsPerUnit: parseFloat(product.carbohydrates),
            proteinsPerUnit: parseFloat(product.protein),
            fatsPerUnit: parseFloat(product.fat),
            sugarsPerUnit: parseFloat(product.sugar),
            saltsPerUnit: parseFloat(product.salts)
        }
        await addProduct({parsedProduct});
        setOpen(false);

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
    };

    if (manuelSwitch) {
        return (
            <>
                <Fab color="primary" aria-label="add" id="addButton" onClick={() => setOpen(true)}>
                    <AddIcon/>
                </Fab>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <div className="display-flex-row">
                        <DialogTitle>{"Was möchtest du hinzufügen?"}</DialogTitle>
                        <FormControlLabel
                            control={<Switch defaultChecked={false} onChange={() => setManuelSwitch(false)}/>}
                            label="Manuell"/>
                    </div>
                    <DialogContent>
                        <div className="addFoodCardTitle">
                            <TextField
                                id="addFoodCardTitle"
                                label="Titel"
                                variant="outlined"
                                value={product.name}
                                onChange={handleChange("name")}
                            />
                            <Box sx={{maxWidth: 226}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kategory</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={product.category}
                                        label="Category"
                                        onChange={handleChange("category")}
                                        variant="outlined"
                                        required={true}>
                                        <MenuItem value={"Carbohydrate"}>Kohlenhydrate</MenuItem>
                                        <MenuItem value={"Protein"}>Proteine</MenuItem>
                                        <MenuItem value={"Fat"}>Fett</MenuItem>
                                        <MenuItem value={"Sugar"}>Zucker</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className="addNutritionInfo">
                            <TextField label="Kalorien Pro 100g" value={product.caloriesPerUnit}
                                       onChange={handleChange("caloriesPerUnit")}/>
                            <TextField label="Kohlenhydrate" value={product.carbohydrates}
                                       onChange={handleChange("carbohydrates")}/>
                            <TextField label="Proteine" value={product.protein} onChange={handleChange("protein")}/>
                            <TextField label="Fett" value={product.fat} onChange={handleChange("fat")}/>
                            <TextField label="Zucker" value={product.sugar} onChange={handleChange("sugar")}/>
                            <TextField label="Salz" value={product.salts} onChange={handleChange("salts")}/>
                            <TextField label="Anzahl" value={product.stock} onChange={handleChange("stock")}/>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Abbrechen</Button>
                        <Button onClick={handleSubmit}>Hinzufügen</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    } else {
        return (
            <>
                <Fab color="primary" aria-label="add" id="addButton" onClick={() => setOpen(true)}>
                    <AddIcon/>
                </Fab>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <div className="display-flex-row">
                        <DialogTitle>{"Was möchtest du hinzufügen?"}</DialogTitle>
                        <FormControlLabel
                            control={<Switch defaultChecked={false} onChange={() => setManuelSwitch(true)}/>}
                            label="Manuell"/>
                    </div>
                    <DialogContent>
                        <FoodSearch productsToUpdate={productsToUpdate}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Abbrechen</Button>
                        <Button onClick={handleSubmit}>Hinzufügen</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


}