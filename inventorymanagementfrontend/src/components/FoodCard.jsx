import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import {NutritionInfo} from "./NutritionInfo";
import {DeleteProductDialog} from "./DeleteProductDialog"
import {EditDialog} from "./EditProductDialog"
import {useEffect, useState} from "react";

export function FoodCard({product, setProducts}) {

    const [publicImgUri, setPublicImgUri] = useState(true);

    const [updateAbleProduct, setUpdatedProduct] = useState({
        id: product.id,
        name: product.name,
        img: product.imgName,
        category: product.category,
        stock: product.stock,
        caloriesPerUnit: product.caloriesPerUnit,
        carbsPerUnit: product.carbsPerUnit,
        proteinsPerUnit: product.proteinsPerUnit,
        fatsPerUnit: product.fatsPerUnit,
        saltsPerUnit: product.saltsPerUnit,
        sugarsPerUnit: product.sugarsPerUnit
    })

    useEffect(() => {
        function checkIfPublicImgUri() {
            if (updateAbleProduct.img != null) {
                let imgUri = updateAbleProduct.img;
                console.log("imgUri: " + imgUri)
                if (imgUri.startsWith("https://")) {
                    setPublicImgUri(false);
                }
            }
        }
        checkIfPublicImgUri();
    }, [publicImgUri]);


    return (
        <Card sx={{maxWidth: 345}} style={{borderRadius: "10px"}} className="foodElement">
            <CardMedia
                component="img"
                alt="Missing Picture"
                height="140"
                src={publicImgUri ? `/images/${updateAbleProduct.img}` : `${updateAbleProduct.img}`}
            />
            <CardContent className="background-color-persianBlue">
                <Typography gutterBottom variant="h5" component={"span"} className="white-font">
                    {updateAbleProduct.name}
                </Typography>
                <NutritionInfo product={updateAbleProduct}/>
            </CardContent>
            <CardActions className="CardButtons">
                <EditDialog product={updateAbleProduct} setUpdatedProduct={setUpdatedProduct}/>
                <DeleteProductDialog product={updateAbleProduct} setProducts={setProducts}/>
            </CardActions>
        </Card>
    )
}