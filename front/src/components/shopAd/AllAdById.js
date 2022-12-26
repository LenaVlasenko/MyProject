import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/AllAd.css"


export default function AllAdById() {
    const {adId} = useParams();
    console.log('adId: ' + adId)

    const [ads, setAds] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )

    const loadAd = function () {
        fetch("http://localhost:3333/api"
            + "/ad/" + adId
            // + '&author_id=' + user._id
            //+ '&shop_id=' + ads._id
            // + '&author_id=' + adId
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
                    console.log("Я нічого не рблю")
                    return
                }
                toast.success("Усі картки магазину")
                console.log(data)
                setAds(data)
            })
            .catch(err=>{
                console.log(err)
            })

    }

    const deleteAd = function (ev) {
        console.log("Start Del")
        console.log(ev.target.value)
        let id = ev.target.value

        fetch('http://localhost:3333/api' + '/ad/' + id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('jwtToken')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.status)
                if(res.status === 204) {
                    toast.success(" Ви видалили картку товару")
                    loadAd()
                    return
                }
                toast.error(" Виникла помилка ")

            })
            .catch(err=> {
                console.log(err)
                toast.error(err)
            })


    }

    useEffect( () => {
        if ( localStorage.getItem('user') ){ // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse (localStorage.getItem('user')))
        }
        loadAd()
    }, [])


    return(

        <div>
            <div> { user.email} </div>
            <div className='adTitle'>
                {/*{ads.map(ad => (*/}
                    <div key={ads._id}  className='title'>
                        <div className='iconCard'>
                            <p>{ads.imgCard}</p>
                        </div>
                        <div className='cartProd'>
                            <p className='adName'>Назва: {ads.title}</p>
                            <p>{ads.message}</p>
                            <p>Ціна: {ads.price} грн</p>
                        </div>
                        <div>
                            { ads.author_id === user._id ? <p className='button'> <button> Edit </button> <button value={ads._id} onClick={deleteAd}> Delete </button>  </p> : " Не мое" }
                        </div>

                    </div>

                {/*))*/}
                {/*}*/}

            </div>


        </div>

    )
}