import * as React from "react";
import {DialogContentText, Fab, useMediaQuery, useTheme} from "@mui/material";
import {deleteProduct, getAllProducts} from "../api/ProductAPICalls";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export function DeleteProductDialog({product, setProducts}) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteProduct(product);
        setOpen(false);
        const result = await getAllProducts();
        setProducts(result);
    }

    return (
        <React.Fragment>
            <Fab color="#818181" aria-label="delete" id="deleteButton" onClick={handleClickOpen} className="z-Index0">
                <DeleteForeverIcon/>
            </Fab>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Produkt entfernen"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bist du dir sicher, das du dieses Produkt entfernen möchtest
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}