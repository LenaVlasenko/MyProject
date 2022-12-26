import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function CreateAd(){

    //Если в хранилище нет ключа, перейти на страницу логина
    let navigate = useNavigate();
    useEffect( () =>{
        if(localStorage.getItem('jwtToken') === null){
            return navigate("/login");
        }
    }, [])


    const formSchema = Yup.object().shape({
        title: Yup.string()
            .required('Заголовок обов язковий')
            .min(3, 'Мінімальна довжина 5 символів'),
        message: Yup.string()
            .required('Опис обов язковий')
            .min(10, 'Мінімальна довжина 10 символів')
            .max(300, 'Максимальна довжина 300 символів'),
        price: Yup.number()
            .required('Обов язкове'),

    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = function (data){


        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('message', data.message)
        formData.append('price', data.price)
        if(data.file[0])
            // Присоединяем данные из файла в форму
            formData.append("file", data.file[0]);



        fetch("http://localhost:3333/api" + "/ad", {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('jwtToken')

            },
            body: formData
        })
            .then(res => {
                //console.log(res)
                if (res.status !== 201){
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
                toast.success("ви строрили картку товару")
                //toast.success(data.token)
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
                toast.error(err)
            })
    }







    return (
        <div className="container mt-5">
            <h6>Создать обьявление</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Фото товару:</label><br/>
                    <input type="file" {...register("file")} />
                </div>

                <div className="form-group">
                    <label>Заголовок</label>
                    <input
                        name="title"
                        type="text"
                        {...register('title')}
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group">
                    <label>Текст опис товару</label>
                    <textarea
                        name="message"
                        {...register('message')}
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.message?.message}</div>
                </div>
                <div className="form-group">
                    <label>Ціна</label>
                    <input
                        name="price"
                        type="number"
                        {...register('price')}
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>


                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}