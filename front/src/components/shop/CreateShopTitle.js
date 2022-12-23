import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export default function CreateShopTitle() {

    //Если в хранилище нет ключа, перейти на страницу логина
    let navigate = useNavigate();
    useEffect( () =>{
        if(localStorage.getItem('jwtToken') === null){
            return navigate("/login");
        }
    }, [])

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Почта обязательна')
            .email('Формат почты не верный'),
        shopName: Yup.string()
            .required('Ім"я вашого магазину обов"язкове')
            .min(3, 'Мінімальна довжина 3 символи'),
        contact: Yup.string()
            .required('Номер телефону вашого магазину обов язкове'),
        location: Yup.string()
            .required('Поле обов"язкове'),
        // telegram: Yup.string()
        //     .required('Поле обов"язкове'),
        typeShop: Yup.string()
            .required('Поле обов"язкове'),
        typeProduct: Yup.string()
            .required('Поле обов"язкове'),
        aboutShop: Yup.string()
            .required('Поле обов"язкове'),


    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = function (data){


        const formData = new FormData();
        formData.append('email', data.email)
        formData.append('shopName', data.shopName)
        formData.append('typeProduct', data.typeProduct)
        formData.append('typeShop', data.typeShop)
        formData.append('contact', data.contact)
        formData.append('location', data.location)
        formData.append('aboutShop', data.aboutShop)
        if(data.file[0])
            // Присоединяем данные из файла в форму
            formData.append("file", data.file[0]);




        fetch("http://localhost:3333/api" + "/shop", {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('jwtToken')
            },
            body: formData
        })
            .then(res => {
                //console.log(res)
                if (res.status !== 201){
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
                toast.success("Ви створили титульну сторінку свого магазину")
                toast.success(data.shopName)
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
                toast.error(err)
            })
    }



    return(
        <div className="container mt-5">
            <h2>Створіть ваш магазин</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Фото магазину:</label><br/>
                    <input type="file" {...register("file")} />
                </div>


                <div className="form-group">
                    <label>Назва магазину</label>
                    <input
                        name="shopName"
                        type="text"
                        {...register('shopName')}
                        className={`form-control ${errors.shopName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.shopName?.message}</div>
                </div>
                <div className="form-group">
                    <label>Ваш магазин про: </label><br/>
                    <select
                        {...register("typeProduct")}>
                        <option value="0">Одяг</option>
                        <option value="1" >Меблі</option>
                        <option value="2" >Продукти</option>
                        <option value="3" >Автомобілі</option>
                        <option value="4" >Послуги</option>
                        <option value="5" >HandMade</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Ви є : </label><br/>
                    <select
                        {...register("typeShop")}>
                        <option value="0">Український виробник</option>
                        <option value="1" >Підприемець</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Email :</label>
                    <input
                        name="email"
                        type="email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label>Номер телефону :</label>
                    <input
                        name="contact"
                        type="text"
                        {...register('contact')}
                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.contact?.message}</div>
                </div>
                <div className="form-group">
                    <label>Адресса або місто де ви знаходитель</label>
                    <input
                        name="location"
                        type="text"
                        {...register('location')}
                        className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.location?.message}</div>
                </div>

                {/*<div className="form-group">*/}
                {/*    <label>Посилання на ваш телеграм канал</label>*/}
                {/*    <input*/}
                {/*        name="telegram"*/}
                {/*        type="text"*/}
                {/*        {...register('telegram')}*/}
                {/*        className={`form-control ${errors.telegram ? 'is-invalid' : ''}`}*/}
                {/*    />*/}
                {/*    <div className="invalid-feedback">{errors.telegram?.message}</div>*/}
                {/*</div>*/}


                <div className="form-group">
                    <label>Про магазин або як зробити замовлення</label>
                    <textarea
                        name="aboutShop"
                        {...register('aboutShop')}
                        className={`form-control ${errors.aboutShop ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.aboutShop?.message}</div>
                </div>
                <div className="mt-3">
                    <button  type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}