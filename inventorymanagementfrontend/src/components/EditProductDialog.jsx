import * as React from "react";
import {updateProduct} from "../api/ProductAPICalls";
import {Fragment} from "react";
import {Box, Fab, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {ImageSelectBox} from "./SelectBoxes";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export function EditDialog({product, setUpdatedProduct}) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (field) => (event) => {
        setUpdatedProduct(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = async () => {
        const parsedProduct = {
            id: product.id,
            name: product.name,
            category: product.category,
            stock: parseInt(product.stock),
            caloriesPerUnit: parseFloat(product.caloriesPerUnit),
            carbsPerUnit: parseFloat(product.carbsPerUnit),
            proteinsPerUnit: parseFloat(product.proteinsPerUnit),
            fatsPerUnit: parseFloat(product.fatsPerUnit),
            sugarsPerUnit: parseFloat(product.sugarsPerUnit),
            saltsPerUnit: parseFloat(product.saltsPerUnit)
        }
        await updateProduct(parsedProduct);
        setOpen(false);
    }

    return (
        <Fragment>
            <Fab color="#818181" aria-label="edit" id="editButton" onClick={handleClickOpen} className="z-Index0">
                <EditIcon/>
            </Fab>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"Was möchtest du ändern?"}</DialogTitle>
                <DialogContent>
                    <div className="addFoodCardTitle">
                        <TextField id="addFoodCardTitle" label="Titel" variant="outlined" required={true}
                                   defaultValue={product.name} onChange={handleChange("name")}/>
                        <ImageSelectBox/>
                        <Box sx={{maxWidth: 226}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Kategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={product.category}
                                    label="Category"
                                    variant="outlined"
                                    required={true}
                                    onChange={handleChange("category")}>
                                    <MenuItem value={"Carbohydrate"}>Kohlenhydrate</MenuItem>
                                    <MenuItem value={"Protein"}>Proteine</MenuItem>
                                    <MenuItem value={"Fat"}>Fett</MenuItem>
                                    <MenuItem value={"Sugar"}>Zucker</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="addNutritionInfo">
                        <TextField label="Kalorien Pro 100g" defaultValue={product.caloriesPerUnit}
                                   onChange={handleChange("caloriesPerUnit")}/>
                        <TextField id="carbohydrates" label="Kohlenhydrate" variant="outlined"
                                   defaultValue={product.carbsPerUnit ? product.carbsPerUnit : ''}
                                   onChange={handleChange("carbsPerUnit")}/>
                        <TextField id="protein" label="Proteine" variant="outlined"
                                   defaultValue={product.proteinsPerUnit ? product.proteinsPerUnit : ''}
                                   onChange={handleChange("proteinsPerUnit")}/>
                        <TextField id="fat" label="Fett" variant="outlined"
                                   defaultValue={product.fatsPerUnit ? product.fatsPerUnit : ''}
                                   onChange={handleChange("fatsPerUnit")}/>
                        <TextField id="sugar" label="Zucker" variant="outlined"
                                   defaultValue={product.sugarsPerUnit ? product.sugarsPerUnit : ''}
                                   onChange={handleChange("sugarsPerUnit")}/>
                        <TextField label="Salz" defaultValue={product.saltsPerUnit}
                                   onChange={handleChange("saltsPerUnit")}/>
                        <TextField label="Anzahl" defaultValue={product.stock} onChange={handleChange("stock")}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={handleSubmit}>Speichern</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}