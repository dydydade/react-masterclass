import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";


function Router() {
    return <BrowserRouter>
        <Routes>
            <Route path="/:coinId/*" element={<Coin></Coin>} />
            <Route path="/" element={<Coins></Coins>} />
        </Routes>
    </BrowserRouter>
}

export default Router;