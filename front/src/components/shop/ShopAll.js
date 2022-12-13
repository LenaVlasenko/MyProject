import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function ShopAll() {


    const [shop, setShop] = useState([])

    const loadShop = function () {
        fetch("http://localhost:3333/api" + "/shop", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('jwtToken')
            }
        })
            .then(res => {
                //console.log(res)
                if (res.status !== 200){
                    toast.error("Ошибка")
                    return null
                }
                return res.json()
            })
            .then(data =>{
                if (data === null) {
                    // Ответ от сервера с ошибкой
                    console.log("Я ничего не делаю")
                    return
                }
                toast.success("Усі магазини")
                console.log(data)
                setShop(data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect( () => {
        loadShop()
    }, [])


    return(
        <div>
            <div> { shop.name} </div>
            <ul>
                {shop.map(shop => (
                    <li key={shop._id}>
                        <p>{shop.shopName}</p>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}