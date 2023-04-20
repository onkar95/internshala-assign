/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Actions/AuthActions";
import Loading from "../layout/Loader/Loading";
import Navbar from "../layout/navbar/Navbar";


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { userInfo: user, error, loading, userCreated } = useSelector(state => state.user)


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Role, setRole] = useState()
    const [phoneNo, setPhoneNo] = useState()

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [, setPasswordError] = useState("")


    useEffect(() => {
        setEmailError("")
        setNameError("")
        setPasswordError("")
    }, [email, name, password]);

    const validate = () => {

        if (!name || !email || !password || !Role || !phoneNo) {
            alert("fill all details")
        } else if (name.length < 4) {
            setNameError("at least 4 characters are required")
            return false
        } else {
            return true;
        }
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const dataobj = {
            name, email, password, Role, phoneNo
        }

        if (validate()) {
            dispatch(registerUser(dataobj))
        }
    }

    useEffect(() => {
        if (userCreated) alert("added user")
    }, [loading]);
    return (
        <>
            <Navbar />
            {loading ? <Loading /> : <div>

                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">
                        <h4 className="text-muted text-center mb-5">Create an account </h4>

                        <div className="card p-5 shadow">
                            <div className="form-group mx-2">
                                <input className="form-group mx-2" type="radio" value="user" name="role" checked={Role === "user"} onChange={e => setRole(e.target.value)} />
                                <label >user</label>
                                <input className="form-group mx-2" type="radio" value="owner" name="role" onChange={e => setRole(e.target.value)} />
                                <label >owner</label>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name" > Enter your name </label>
                                    <input type="name" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} name='name' />
                                </div>
                                <div className="alert-danger">
                                    {nameError.length > 0 ? nameError : ""}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email" >Email address</label>
                                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="alert-danger">
                                    {emailError}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password" >Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="phoneNo" >phoneNo</label>
                                    <input type="number" className="form-control" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} id="password" />
                                </div>
                                <div className="text-danger">
                                    {error}
                                </div>

                                {!user ?
                                    <>
                                        <button className=" w-25 btn btn-primary btn-block my-3" >Create Account</button>
                                        <button onClick={() => navigate('/login')} className="btn btn-primary  w-25 btn-block">Login</button>
                                    </>
                                    :
                                    <button className="btn btn-primary btn-block my-3" >Create Account</button>
                                }

                            </form>

                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>

            </div>}
        </>
    )
}

export default Register


