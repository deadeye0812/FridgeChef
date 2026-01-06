import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CarbohydratesSite} from "./sites/CarbohydratesSite";
import {ProteinSite} from "./sites/ProteinSite";
import {SnacksSite} from "./sites/SnacksSite";
import {DrinksSite} from "./sites/DrinksSite";
import {ProductsSite} from "./sites/ProductsSite";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsSite/>}/>
                <Route path="/carbohydrates" element={<CarbohydratesSite/>}/>
                <Route path="/proteins" element={<ProteinSite/>}/>
                <Route path="/snacks" element={<SnacksSite/>}/>
                <Route path="/drinks" element={<DrinksSite/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
