/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import { logout } from '../../Redux/Reducers/UserSlice'
import { Userlogout } from '../../Redux/Actions/AuthActions'
import logo from '../../Assets/renitus.jpeg'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.user)

    const logoutUser = () => {
        dispatch(logout())
        dispatch(Userlogout())
        navigate('/user')
    };

    const [Disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (userInfo.length === 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [userInfo])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark Navbar">
                <img className='nav_logo mx-2' src={logo} alt="logo" />
                <Link className="navbar-brand mx-2" to='/' style={{ color: "white" }}>Renitus</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userInfo.length === 0 ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() =>
                                    navigate('/login')}>
                                    Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() =>
                                    navigate('/register')}>
                                    Register
                                </button>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => logoutUser()}>
                                    logout
                                </button>
                                <button className='btn btn-outline-danger' onClick={() => navigate('/profile')}>
                                    Profile
                                </button>
                            </li>
                        </ul>
                    }

                </div>
                {
                    userInfo?.Role === "admin" ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <button className=' btn btn-outline-warning' onClick={() => navigate(`/${userInfo?.Role}/allUsers`)}>
                                        all Users
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => navigate(`/${userInfo?.Role}`)}>
                                        All products
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => navigate(`/${userInfo?.Role}/allOrders`)}>
                                        All Orders
                                    </button>
                                </li>

                            </ul>
                        </div>
                        :
                        userInfo?.Role === "user" ?
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <button className=' btn btn-outline-warning'
                                            onClick={() => navigate(`/${userInfo?.Role}`)}>
                                            Dashboard
                                        </button>
                                    </li>
                                    <li className=" mx-2 nav-item active">
                                        <button className=' btn btn-outline-warning'
                                            onClick={() => navigate(`/${userInfo?.Role}/allrerversations/${userInfo?._id}`)}>
                                            My reservations
                                        </button>
                                    </li>


                                </ul>

                            </div>
                            :
                            userInfo?.Role === "owner" ?
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <button className=' btn btn-outline-warning'
                                                onClick={() => navigate(`/`)}>
                                                My Products
                                            </button>
                                        </li>
                                        <li className="nav-item active">
                                            <button className=' btn btn-outline-warning'
                                                onClick={() => navigate(`/${userInfo?.Role}/addProducts`)}>
                                                AddProduct
                                            </button>
                                        </li>
                                        <li className=" mx-2 nav-item active">
                                            <button className=' btn btn-outline-warning'
                                                onClick={() => navigate(`/${userInfo?.Role}/allrerversations/${userInfo?._id}`)}>
                                                see reservations
                                            </button>
                                        </li>


                                    </ul>

                                </div> : ""

                }
            </nav>
        </>
    )
}

export default Navbar
