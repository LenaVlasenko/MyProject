import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function AllAd() {
    // const {adId} = useParams();
    // console.log('adId: ' + adId)

    const [ads, setAds] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )

    const loadAd = function () {
        fetch("http://localhost:3333/api"
            + "/ad?"
            + '&author_id=' + user._id
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
        if ( localStorage.getItem('user') ){ // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse (localStorage.getItem('user')))
        }
        loadAd()
    }, [])


    return(

        <div>
            <div> { user.email} </div>
            {/*<Link to={`/ad/${ads._id}`}> soobshenie </Link>*/}
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