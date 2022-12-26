import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {toast} from "react-toastify";
import "../../../pages/CSS/formLog.css"

export default function FormLogin(){

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Пошта обов язкова')
            .email('Формат пошти не вірний'),
        password: Yup.string()
            .required('Пароль обов язковий')
            .min(3, 'Мінімальна довжина паролю 3 символи')
            .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g, "Пароль має містити одну велику літеру і один спецсимвол"),

    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = function (data){

        fetch("http://localhost:3333/api" + "/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
                toast.success("Ви успішно увійшли в систему")
                //toast.success(data.token)
                console.log(data)
                localStorage.setItem('jwtToken', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return(
        <div className="container mt-5">
            <h6 className="formDis">Вхід (логін)</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
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