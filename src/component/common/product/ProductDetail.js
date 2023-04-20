import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getSingleProduct } from '../../../Redux/Actions/ProductAction'
import Loading from '../../../layout/Loader/Loading'

const ProductDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()

    const { singleProduct, loading } = useSelector(state => state.product)
    const { userInfo: user } = useSelector(state => state.user)


    useEffect(() => {
        dispatch(getSingleProduct({ id }))
        // eslint-disable-next-line
    }, [id]);

    const handelproductReserve = (id) => {
        if (user?.Role === undefined || user?.length === 0) {
            alert("please Login first")
        } else {
            navigate(`/${user?.Role}/productReserve/${id}`)
        }
    }

    return (
        <>
            {loading ?
                <Loading /> :
                <div className='productDetails'>
                    <div className='productDetails_left'>
                        <div className='productDetails_img_block'>
                            <img className='productDetails_img' src={singleProduct?.avatar?.url} alt='loading' />

                        </div>

                        <div className='productDetails_data'>
                            <p className="card-text"><b className=" model">vehicleModel:</b>{singleProduct.vehicleModel}</p>
                            <p className="card-text"><b> vehicleNumber:</b> {singleProduct.vehicleNumber}</p>
                            <p className="card-text"><b> Rent Per Day:</b>
                                {singleProduct.rentPerDay ? `$${singleProduct.rentPerDay}` : ""}</p>
                            <p className=" card-text"> <b> Availability:</b>  {singleProduct.Availability}</p>

                        </div>
                        <div className='reserve_btn_div '>
                            {user?.Role === "user" ? <button className='btn btn-sm btn-outline-primary my-0'

                                onClick={() => handelproductReserve(singleProduct?._id)}>Take on Rent </button> : ""}
                        </div>

                    </div>


                </div>
            }
        </>
    )
}

export default ProductDetail