import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/AllAd.css"

export default function AllAd() {
    // const {adId} = useParams();
     //console.log('adId: ' + adId)

    const [ad, setAds] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )
    const [total, setTotal] = useState(null)
    const [page, setPage] = useState(1)
    const [per_page, setPerPage] = useState(3)
    //const [author_id, setAutorId] = useState(3)


    // Всего страниц для отображения
    const totalPages = Math.ceil(total / per_page)

    // С какой страницы начинать
    let firstPage = 1
    // Если текущая страница ушла на 3 от начала - сместить мой навигатор
    if (page > 3) firstPage = page - 3

    // До какой страницы выводить объявления
    let countPage = 6 + firstPage // Выводим 6 страничек

    // Если количество странц выходит за пределы - установить последнюю равную общему количеству
    if (countPage > totalPages - 3  )
        countPage = totalPages



    const loadAd = function () {

        fetch("http://localhost:3333/api"
            + '/ad?page=' + page
            + "&per_page=" + per_page
            // + '&author_id=' + adId
            // + "/ad/"
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
                setTotal(data.total) // Всего объявлений



                setAds(data.data)
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

    const goPrev = async function () {
        if(page > 1)
        {
            setPage(page - 1)
        } else {
            toast.info('Вы на первой странице')
        }
    }

    const goNext = function () {
        if (page < total / per_page) {
            setPage(page+1)
        } else {
            toast.info('Вы на последней странице')
        }
    }

    useEffect(() => {
        loadAd()
    }, [page])

    const goPage = function (ev) {
        console.log(ev.target.dataset.page)
        setAds([])
        setPage(ev.target.dataset.page)
    }


    return(

        <div>
            <div className='flexContainer'>
            <div className='adTitle'>
                {ad.map(ad => (
                    <div key={ad._id}  className='title'>
                        <div className='iconCard'>
                            <p>{ad.imgCard}</p>
                        </div>
                        <div className='cartProd'>
                            <p className='adName'>Назва: {ad.title}</p>
                            <p>{ad.message}</p>
                            <p className='price'>Ціна: {ad.price} грн</p>
                        </div>
                        <div>
                            { ad.author_id === user._id ? <p className='button'> <button> Edit </button> <button value={ad._id} onClick={deleteAd}> Delete </button>  </p> : " Не мое" }
                        </div>

                    </div>

                ))
                }

            </div>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={goPrev}>Previous</a></li>



                    {(() => {
                        let li = [];
                        if(firstPage > 1) {
                            li.push(<li className="page-item"><a className="page-link" data-page={1} onClick={goPage}>{1}</a></li>);
                        }
                        if (firstPage > 2) {
                            li.push(<li className="page-item"><a className="page-link"> ... </a></li>);
                        }
                        for (let i = firstPage; i <= countPage; i++) {
                            if (i === page ) {} // Если я вывожу текущую страницу - добавить например класс
                            li.push(<li className="page-item"><a className="page-link" data-page={i} onClick={goPage}>{i}</a></li>);
                        }
                        if(countPage !== totalPages) {
                            li.push(<li className="page-item"><a className="page-link"> ... </a></li>);
                            li.push(<li className="page-item"><a className="page-link" data-page={totalPages} onClick={goPage}>{totalPages}</a></li>);

                        }
                        return li;
                    })()}


                    <li className="page-item"><a className="page-link" onClick={goNext}>Next</a></li>
                </ul>
            </nav>
        </div>

    )
}