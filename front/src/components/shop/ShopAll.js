import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "../../pages/CSS/shopAll.css"
import {Link} from "react-router-dom";

export default function ShopAll() {


    const [shop, setShop] = useState([])
    const [user, setUser] = useState(localStorage.getItem('user')?
        JSON.parse(localStorage.getItem('user')) // Если есть
        :{name: "гість", _id: 0} // Если нет
    )
    const [total, setTotal] = useState(null)
    const [page, setPage] = useState(1)
    const [per_page, setPerPage] = useState(3)


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




    const loadShop = function () {
        fetch("http://localhost:3333/api"
            + "/shop?"
            + "page=" + page + "&per_page=" + per_page
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
                toast.success("Усі магазини")
                console.log(data)
                setShop(data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect( () => {
        if ( localStorage.getItem('user') ){ // Если есть данные по пользователю - восстановить их
            setUser(JSON.parse (localStorage.getItem('user')))
        }
        loadShop()
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
        loadShop()
    }, [page])

    const goPage = function (ev) {
        console.log(ev.target.dataset.page)
        setShop([])
        setPage(ev.target.dataset.page)
    }


    return(

        <div>
            <div>
            <div className='shopTitle'>
                {shop.map(shop => (
                    <div key={shop._id}  className='titleName'>
                        <div className='foto'>
                            <img src={'http://localhost:3333' + shop.avatar} width='200px'/>
                        </div>
                        <div className='inform'>
                            <div className='open'>
                            <Link to={`/shop/${shop._id}`} > Open Shop  </Link>
                            </div>
                            <p className='shopName'>Назва: {shop.shopName}</p>
                            <p>Ваш магазин про: {shop.typeProduct}</p>
                            <p>Хто ви є: {shop.typeShop}</p>
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