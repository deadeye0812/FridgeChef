import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import styles from "../App.css";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 3,
    border: '3px solid',
    borderColor: 'divider'
};

export function NutritionInfo({product}) {
    return (
        <List sx={style} aria-label="mailbox folders" className="background-color-darkBlue white-font">
            <ListItem className={styles.nutritionTable}>
                <ListItemText primary="Proteine"/>
                <ListItemText primary={product.proteinsPerUnit + "g"}  style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Kohlenhydrate"/>
                <ListItemText primary={product.carbsPerUnit + "g"} style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Fett"/>
                <ListItemText primary={product.fatsPerUnit + "g"} style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Zucker"/>
                <ListItemText primary={product.sugarsPerUnit + "g"} style={{textAlign: "end"}}/>
            </ListItem>
        </List>
    );
}

export function NutritionInfoOpenFoodFacts({product}) {
    return (
        <List sx={style} aria-label="mailbox folders">
            <ListItem className={styles.nutritionTable}>
                <ListItemText primary="Proteine"/>
                <ListItemText primary={product.proteins_100g + "g"}  style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Kohlenhydrate"/>
                <ListItemText primary={product.carbohydrates_100g + "g"} style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Fett"/>
                <ListItemText primary={product.fat_100g + "g"} style={{textAlign: "end"}}/>
            </ListItem>
            <Divider component="li"/>
            <ListItem>
                <ListItemText primary="Zucker"/>
                <ListItemText primary={product.sugars_100g + "g"} style={{textAlign: "end"}}/>
            </ListItem>
        </List>
    );
}