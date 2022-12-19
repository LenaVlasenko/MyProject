import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function AllAd() {


    const [ads, setAds] = useState([])
    const [user, setUser] = useState({name: "гість", _id: 0})

    const loadAd = function () {
        fetch("http://localhost:3333/api" + "/ad", {
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
                    toast.success(" Вы успешно удалили запись")
                    loadAd()
                    return
                }
                toast.error(" Произошла ошибка удаления ")

            })
            .catch(err=> {
                console.log(err)
                toast.error(err)
            })


    }

    useEffect( () => {
        loadAd()
        if ( localStorage.getItem('user') ){ // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse (localStorage.getItem('user')))
        }
    }, [])


    return(

        <div>
            <div> { user.email} </div>
            <div className='adTitle'>
                {ads.map(ad => (
                    <div key={ad._id}  className='title'>
                        <div className='icon'>
                            <p>{ad.avatar}</p>
                        </div>
                        <div className='cartProd'>
                            <p className='adName'>Назва: {ad.title}</p>
                            <p>{ad.message}</p>
                            <p>Ціна: {ad.price} грн</p>
                        </div>
                        <div>
                            { ad.author_id === user._id ? <p className='button'> <button> Edit </button> <button value={ad._id} onClick={deleteAd}> Delete </button>  </p> : " Не мое" }
                        </div>

                    </div>

                ))
                }

            </div>


        </div>

    )
}