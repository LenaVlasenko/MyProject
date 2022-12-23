import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error404 from "./pages/Error404";
import FooterPage from "./pages/FooterPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ShopHomePage from "./pages/shop/ShopHomePage";
import CreateShopTitle from "./components/shop/CreateShopTitle";
import ShopOne from "./components/shop/ShopOne";
import CreateAd from "./components/shopAd/CreateAd";
import ShopOneById from "./components/shop/ShopOneById";
import AllAd from "./components/shopAd/AllAd";
import EditAd from "./components/shopAd/EditAd";
import AllAdById from "./components/shopAd/AllAdById";


export default function MyRoutes(){

    return (

        <Routes>
            <Route path="/" element={<HomePage></HomePage>} />
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/shopAll" element={<ShopHomePage></ShopHomePage>} />
            <Route path="/shopOne" element={<ShopOne></ShopOne>} />
            <Route path="/shopTitle" element={<CreateShopTitle></CreateShopTitle>} />
            <Route path="/createAd" element={<CreateAd></CreateAd>} />


            {/*<Route path="/ad/:adId/editAd" element={<EditAd></EditAd>} />*/}



            <Route path="/shop/:shopId" element={<ShopOneById></ShopOneById>} />
            <Route path="/ad/:adId" element={<AllAd></AllAd>} />



            <Route path="/footer" element={<FooterPage></FooterPage>} />
            <Route path="*" element={<Error404></Error404>} />
        </Routes>
    )
}