import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../layout/Loader/Loading'
import { getSingleProduct } from '../../Redux/Actions/ProductAction'
import { BASE_URL } from '../../Redux/utils'

const EditCar = () => {
    const { userInfo } = useSelector(state => state.user)
    const { singleProduct, loading } = useSelector(state => state.product)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [seatingCapacity, setseatingCapacity] = useState()
    const [RentPerDay, setRentPerDay] = useState()
    const [vehicleModel, setvehicleModel] = useState()
    const [vehicleNumber, setvehicleNumber] = useState()

    let { id } = useParams()

    useEffect(() => {
        dispatch(getSingleProduct({ id }))
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {

        setseatingCapacity(singleProduct?.seatingCapacity)
        setvehicleModel(singleProduct?.vehicleModel)
        setRentPerDay(singleProduct?.rentPerDay)
        setvehicleNumber(singleProduct?.vehicleNumber)

        // eslint-disable-next-line
    }, [singleProduct, id]);


    const handelSubmit = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("userId", userInfo?._id);
        myForm.set("vehicleModel", vehicleModel);
        myForm.set("vehicleNumber", vehicleNumber);
        myForm.set("seatingCapacity", seatingCapacity);
        myForm.set("rentPerDay", RentPerDay);

        const token = localStorage.getItem('token')
        console.log(token)
        const config = { headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } }
        axios.put(`${BASE_URL}/car/owner/updatecar/${id}`, myForm, config)
            .then((data) => {
                alert(" saved");
                navigate('/')``
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setseatingCapacity('')
                setRentPerDay('')
                setvehicleModel('')
                setvehicleNumber('')
            })

    }




    return (
        <>

            {
                loading ?
                    <Loading />
                    : <div className="row">
                        <div className="col-sm-2" />
                        <div className="col-sm-8">
                            <h4 className="text-muted text-center mb-5">Add Car </h4>
                            <form onSubmit={(e) => handelSubmit(e)}>
                                <div className="card p-5 shadow">
                                    <div className="form-group mx-2 my-1" >
                                        <label>Vehicle Model </label>
                                        <input className="form-control card" type='text' value={vehicleModel} onChange={(a) => setvehicleModel(a.target.value)} />
                                    </div>
                                    <div className="form-group mx-2 my-1" >
                                        <label>Vehicle Number </label>
                                        <input className="form-control card" type='text' value={vehicleNumber} onChange={(a) => setvehicleNumber(a.target.value)} />
                                    </div>


                                    <div className="form-group mx-2 my-1" >
                                        <label> Seating Capacity </label>

                                        <input className="form-control" type='text' value={seatingCapacity}
                                            onChange={(a) => setseatingCapacity(a.target.value)} />
                                    </div>


                                    <div className="form-group mx-2 my-1" >
                                        <label>Rent Per Day </label>
                                        <input className="form-control card p-2 shadow" placeholder='enter amount' type='text' value={RentPerDay} onChange={(a) => setRentPerDay(a.target.value)} />
                                    </div>
                                    <div>

                                        <button type='submit' className="btn btn-primary p-2  my-3 mx-2" > Save</button>
                                        <button onClick={() => navigate('/')} className="btn btn-secondary p-2  my-3 " > cancle</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="col-sm-2" />
                    </div>
            }

        </>
    )
}

export default EditCar