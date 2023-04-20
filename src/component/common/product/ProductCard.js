
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCar } from '../../../Redux/Actions/ProductAction';


export default function ProductCard({ val, key }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo: user } = useSelector(state => state.user)

    const handelproductReserve = (id) => {
        if (user?.Role === undefined || user?.length === 0) {
            alert("please Login first")
            navigate('/login')
        } else {
            navigate(`/${user?.Role}/productReserve/${id}`)
        }
    }

    const handelproductDelete = (id) => {
        console.log(id)
        if (window.confirm("Do you really want to delete") === true) {
            dispatch(deleteCar({ id }))
        }
    }

    return (
        <div id={key}>
            <div className="customCard" >
                <img className='product_img' src={val?.avatar?.url} alt='on' />
                <div className='card_info'>
                    <div className='card_info_r1' >
                        {
                            user.Role === "owner" ?
                                <div className='card_info_r1'>
                                    <p className="card-text m-0 "><b> vehicleModel:</b> {val.vehicleModel}</p>
                                    <p className="card-text m-0 "><b>vehicleNumber</b> :{val?.vehicleNumber}</p>
                                    <p className="card-text m-0 "><b>seatingCapacity</b>  :{val?.seatingCapacity}</p>
                                    <p className="card-text m-0 "><b>Rent Per Day :</b> {val.rentPerDay ? `$${val.rentPerDay}` : ""}</p>
                                </div>
                                :
                                user.Role === "user" ?
                                    <div className='card_info_r1'>
                                        <p className="card-text m-0 "><b> vehicleModel:</b> {val.vehicleModel}</p>
                                        <p className="card-text m-0 "><b>Rent Per Day :</b> {val.rentPerDay ? `$${val.rentPerDay}` : ""}</p>
                                        <span className='card-text m-0 d-flex'>
                                            <b className='m-0' >Availability:</b>
                                            <p className={val.Availability !== "Available" ? "m-0 text-danger fw-bold " : "m-0 text-success fw-bold"}> {val.Availability ? `${val.Availability}` : ""}</p>
                                        </span>


                                    </div>
                                    :
                                    user?.Role === "admin" ?
                                        <div className='card_info_r1'>
                                            <p className="card-text m-0 "><b> vehicleModel:</b> {val.vehicleModel}</p>
                                            <p className="card-text m-0 "><b>vehicleNumber</b> :{val?.vehicleNumber}</p>
                                            <p className="card-text m-0 "><b>seatingCapacity</b>  :{val?.seatingCapacity}</p>
                                            <p className="card-text m-0 "><b>Rent Per Day :</b> {val.rentPerDay ? `$${val.rentPerDay}` : ""}</p>
                                        </div> :
                                        <div className='card_info_r1'>
                                            <p className="card-text m-0 "><b> vehicleModel:</b> {val.vehicleModel}</p>
                                            <p className="card-text m-0 "><b>seatingCapacity</b>  :{val?.seatingCapacity}</p>
                                            <p className="card-text m-0 "><b>Rent Per Day :</b> {val.rentPerDay ? `$${val.rentPerDay}` : ""}</p>
                                        </div>
                        }

                    </div>

                </div>

                {user?.Role === "owner" ?

                    <div className='d-flex justify-content-evenly buttons'>

                        <button className='btn btn-sm btn-outline-warning'
                            onClick={() => {
                                navigate(`/${user?.Role}/updatecar/${val?._id}`)
                            }}>edit
                        </button>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => handelproductDelete(val?._id)}>delete</button>
                    </div>
                    :
                    user?.Role === "user" ?
                        <div className='d-flex justify-content-evenly buttons'>
                            <button className='btn btn-sm btn-outline-primary'
                                onClick={() => handelproductReserve(val?._id)}>Rent</button>
                            <button type="button" class="btn btn-primary" onClick={() =>
                                navigate(`/${user?.Role}/productDetail/${val?._id}`)}>
                                More
                            </button>

                        </div> :
                        user?.Role === "admin" ?
                            <div className='d-flex justify-content-evenly buttons'>
                                <button type="button" class="btn btn-primary" onClick={() =>
                                    navigate(`/${user?.Role}/productDetail/${val?._id}`)}>
                                    More
                                </button>

                            </div>
                            :
                            <div className='d-flex justify-content-evenly buttons'>
                                <button className='btn btn-sm btn-outline-primary'
                                    onClick={() => handelproductReserve(val?._id)}>Rent</button>
                                {/* <button type="button" class="btn btn-primary" onClick={() =>
                                navigate(`/${user?.Role}/productDetail/${val?._id}`)}>
                                More
                            </button> */}
                            </div>
                }

            </div>
        </div>


    );
}
