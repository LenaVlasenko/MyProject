import "./CSS/home.css"
import ShopHomePage from "./shop/ShopHomePage";


export default function HomePage(){
    return(
           <div className="container mt-5">
               <div className="rec">
                   <div className="marginT">
                   Тут може бути ваша реклама
                   </div>
                   <div className="marginT">
                   Тут може бути ваша реклама
                   </div>
                   <div className="marginT">
                   Тут може бути ваша реклама
                   </div>
               </div>
               <ShopHomePage></ShopHomePage>
        </div>
    )
}