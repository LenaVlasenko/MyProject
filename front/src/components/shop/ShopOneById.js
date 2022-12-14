import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/shopOne.css"
import AllAd from "../shopAd/AllAd";

// props
export default function ShopOneById() {
    const {shopId} = useParams();
    console.log('ShopId' + shopId)


    const [shop, setShop] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )


    const loadShop = function () {

        fetch("http://localhost:3333/api"
            + "/shop/"+ shopId
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
                    toast.error("Помилка")
                    return null
                }
                return res.json()
            })
            .then(data =>{
                if (data === null) {
                    // Ответ от сервера с ошибкой
                    console.log("Я нічого не роблю")
                    return
                }
                toast.success("Магазин")// Ваш магазин
                console.log(data)
                setShop(data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const deleteShop = function (ev){
        console.log("Start Del")
        console.log(ev.target.value)
        let id = ev.target.value

        fetch("http://localhost:3333/api" + "/shop/" + id, {
            method: 'DELETE',
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
                <div>
                    <div key={shop._id} className='shopDiv'>
                        <div className='icon'>
                            <img src={'http://localhost:3333' + shop.avatar}/>
                        </div>
                        <div className='info'>
                            <p className='shopName'>Назва: {shop.shopName}</p>
                            {/*<p>Хто ви є: {shop.typeShop}</p>*/}
                            <p>Телефон: {shop.contact}</p>
                            <p>Місто: {shop.location}</p>
                        </div>
                        <div className='aboutShop'>
                            <p>Про магазин:<br/>{shop.aboutShop}</p>
                        </div>
                        <div>
                            { shop.author_id === user._id ? <p className='button'> <button> Edit </button> <button value={shop._id} onClick={deleteShop}> Delete </button>  </p> : " Не мое" }
                        </div>
                    </div>

                </div>
                <div>
                    <div className="block">
                    { shop.author_id === user._id ?  <button className="createCard"><Link className="nav-link" to="/createAd">Створити картку товару</Link></button>: " Не мое" }
                    <div className="reclama">
                        <p>Тут має бути ваша реклама</p>
                    </div>
                    </div>
                    <AllAd></AllAd>
                </div>

            </div>

        </div>
    )
}