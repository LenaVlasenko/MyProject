import {Link} from "react-router-dom";
import './CSS/nav.css'

export default function Navigation(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/"><span className="logo">UkT</span></Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">




                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/"></Link>
                            <Link className="nav-link" to="/">Головна </Link>
                        </li>


                        <div className="btn-group">
                            <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                Що шукаєте
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="nav-link" to="/shop">Усі магазини</Link></li>
                                <li><a className="dropdown-item" href="#">Український виробник</a></li>
                                <li><a className="dropdown-item" href="#">Підприємець</a></li>
                                <li><Link className="nav-link" to="/shopTitle">Створити магазин</Link></li>
                            </ul>
                        </div>


                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/shop">Shop Home Page</Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Регістрація</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Вхід</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    )
}