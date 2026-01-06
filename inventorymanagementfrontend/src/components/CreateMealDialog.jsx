import * as React from "react";
import {Fab} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {CreateMeals} from "./GeminiCreateMeals";

export function CreateMealDialog({products, productsToUpdate}) {
    const [open, setOpen] = React.useState(false);

    return (<>
            <Fab color="primary" aria-label="add" id="addMealButton" onClick={() => setOpen(true)}>
                <RestaurantIcon/>
            </Fab>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className="display-flex-row">
                    <DialogTitle>{"Gerichte erstellen"}</DialogTitle>
                </div>
                <DialogContent className="generateButton">
                    <CreateMeals products={products} productsToUpdate={productsToUpdate}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        </>);
}