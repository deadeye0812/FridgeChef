import {getAllProductImages} from "../api/ProductAPICalls";
import * as React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function ImageSelectBox() {
    const images = getAllProductImages();

    return (
        <Box sx={{maxWidth: 226}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bilder</InputLabel>
                <ShowAllAvailableImages images={images ? images : ''}/>
            </FormControl>
        </Box>
    );
}

function ShowAllAvailableImages({images}) {
    const [image, setImage] = React.useState('');
    const handleChange = (event) => {
        setImage(event.target.value);
    };

    const availableImages = images.map(image => {
        return (
            <MenuItem value={image}>{image}</MenuItem>
        )
    });

    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={image}
            label="Category"
            onChange={handleChange}
            variant="outlined"
            required={true}>
            {availableImages}
        </Select>
    );
}