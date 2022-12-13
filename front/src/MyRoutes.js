import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error404 from "./pages/Error404";
import FooterPage from "./pages/FooterPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ShopHomePage from "./pages/shop/ShopHomePage";
import CreateShop from "./pages/shop/CreateShop";
import CreateShopTitle from "./components/shop/CreateShopTitle";


export default function MyRoutes(){

    return (
        <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
            {/*<Route path="/shop" element={<ShopHomePage></ShopHomePage>} />*/}
            <Route path="/shopTitle" element={<CreateShopTitle></CreateShopTitle>} />

            <Route path="/footer" element={<FooterPage></FooterPage>} />
            <Route path="*" element={<Error404></Error404>} />
        </Routes>
    )
}