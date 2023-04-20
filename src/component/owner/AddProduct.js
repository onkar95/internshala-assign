import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../../Redux/utils'

const AddCar = () => {
    const { userInfo } = useSelector(state => state.user)
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [imgUrl, setimgUrl] = useState("")
    const [seatingCapacity, setseatingCapacity] = useState("")
    const [RentPerDay, setRentPerDay] = useState("")
    const [vehicleModel, setvehicleModel] = useState("")
    const [vehicleNumber, setvehicleNumber] = useState("")

    const handelSubmit = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("userId", userInfo?._id);
        myForm.set("vehicleModel", vehicleModel);
        myForm.set("vehicleNumber", vehicleNumber);
        myForm.set("seatingCapacity", seatingCapacity);
        myForm.set("avatar", imgUrl);
        myForm.set("rentPerDay", RentPerDay);

        const token = localStorage.getItem('token')
        const config = { Headers: { "x-access-token": token, "Content-Type": "multipart/form-data" } }
        axios.post(`${BASE_URL}/Car/addCar`, myForm, config)
            .then((data) => {
                alert(" Car added");
                navigate('/')
            })
            .catch((err) => {
                alert("failed to add please try to select image less tha 1Mb")
                console.log(err)
            }).finally(() => {
                formRef.current.reset();
                setseatingCapacity("")
                setvehicleNumber("")
                setvehicleModel("")
                setRentPerDay("")
            })

    }

    const handelImg = (a) => {
        setimgUrl(a.target.value)
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setimgUrl(reader.result);
            }
        };

        reader.readAsDataURL(a.target.files[0]);
    }


    return (
        <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
                <h4 className="text-muted text-center mb-5">Add Car </h4>
                <form ref={formRef} onSubmit={(e) => handelSubmit(e)}>
                    <div className="card p-5 shadow">
                        <div className="form-group  mx-2 my-1" >
                            <label>Vehicle Model </label>
                            <input className="form-control card" type='text' value={vehicleModel} onChange={(a) => setvehicleModel(a.target.value)} />
                        </div>
                        <div className="form-group  mx-2 my-1" >
                            <label>Vehicle Number </label>
                            <input className="form-control card" type='text' value={vehicleNumber} onChange={(a) => setvehicleNumber(a.target.value)} />
                        </div>
                        <div className="form-group  mx-2 my-1" >
                            <label>Car Image</label>
                            <input className="form-control card p-2 shadow"
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={(a) => handelImg(a)} />
                        </div>

                        <div className="form-group  mx-2 my-1" >
                            <label> Seating Capacity </label>

                            <input className="form-control" type='text' value={seatingCapacity}
                                onChange={(a) => setseatingCapacity(a.target.value)} />
                        </div>
                        <div className="form-group  mx-2 my-1" >
                            <label>Rent Per Day </label>
                            <input className="form-control card p-2 shadow" placeholder='enter amount' type='text' value={RentPerDay} onChange={(a) => setRentPerDay(a.target.value)} />
                        </div>
                        <button type='submit' className="btn btn-primary p-2  my-3 w-25" >Add Car</button>

                    </div>
                </form>
            </div >
            <div className="col-sm-2" />
        </div >
    )
}

export default AddCar