import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/shopAll.css"

export default function ShopAll() {


    const [shop, setShop] = useState([])
    const [user, setUser] = useState({name: "гість", _id: 0})

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
        if ( localStorage.getItem('user') ){ // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse (localStorage.getItem('user')))
        }
    }, [])


    return(

        <div>
            <div> { user.email} </div>
            <div className='shopTitle'>
                {shop.map(shop => (
                    <div key={shop._id}  className='titleName'>
                        <div className='foto'>
                        <p>{shop.avatar}</p>
                        </div>
                        <div className='inform'>
                        <p className='shopName'>Назва: {shop.shopName}</p>
                            <p>Телефон: {shop.contact}</p>
                        <p>Місто: {shop.location}</p>
                        </div>
                        <div className='about'>
                            <p>Про магазин:<br/>{shop.aboutShop}</p>
                        </div>

                    </div>


                ))
                }

            </div>




        </div>

    )
}