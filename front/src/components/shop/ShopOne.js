import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/shopOne.css"
import {Link} from "react-router-dom";
import AllAd from "../shopAd/AllAd";

export default function ShopOne() {


    const [shops, setShop] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )


    const loadShop = function () {

        fetch("http://localhost:3333/api"
            + "/shop?" + user._id
            // + '&author_id=' + user._id
            , {
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
                toast.success("Ваш магазин")// Ваш магазин
                console.log(data)
                setShop(data)
            })
            .catch(err=>{
                console.log(err)
            })
        //console.log(user._id)
    }

    const deleteShop = function (ev){
        console.log("Start Del")
        console.log(ev.target.value)
        let id = ev.target.value

        fetch("http://localhost:3333/api"
            + "/shop/"
            + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('jwtToken')
            }
        })
            .then( res => {
                console.log(res)
                console.log(res.status)
                if(res.status === 204) {
                    toast.success("Ви видалили магагзин")
                    loadShop()
                    return
                }
                toast.error("Виникла помилка")
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect( () => {
        if (localStorage.getItem('user')) { // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        loadShop()

    }, [])


    return(
        <div className="container mt-5">
            <div className='marTop'>
                <div> { user.email} </div>
                <div>
                    {shops.map(shop => (
                        <div key={shop._id} className='shopDiv'>
                            <div className='foto'>
                                <img src={'http://localhost:3333' + shop.avatar}/>
                            </div>
                            <div className='info'>
                                <p className='shopName'>Назва: {shop.shopName}</p>
                                <p>Ваш магазин про: {shop.typeProduct}</p>
                                <p>Хто ви є: {shop.typeShop}</p>
                                <p>Телефон: {shop.contact}</p>
                                <p>Місто: {shop.location}</p>
                            </div>
                            <div className='aboutShop'>
                                <p>Про магазин:<br/>{shop.aboutShop}</p>
                            </div>
                            <div>
                                { shop.author_id === user._id ? <p className='button'> <button>Edit</button> <button value={shop._id} onClick={deleteShop}> Delete </button>  </p> : " Не мое" }
                            </div>
                        </div>

                    ))
                    }
                </div>
                <div>
                    <button><Link className="nav-link" to="/createAd">Створити картку товару</Link></button>
                    <AllAd></AllAd>
                </div>

            </div>

        </div>
    )
}