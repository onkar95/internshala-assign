
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../layout/Loader/Loading';
import { cancleReservation } from '../../Redux/Actions/ReservationAction';
import '../../Screens/Screen.css'


const UserReservations = ({ reservData }) => {

    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { loading, loadingR } = useSelector(state => state.reserve)
    const dispatch = useDispatch()

    const cancelreservation = (id, BId) => {
        if (window.confirm("Do you really want cancel") === true) {
            const obj = {
                Active: false,
                id
            }
            dispatch(cancleReservation(obj))
        }
    }
    return (


        <div>
            {loading || userloading || loadingR ? <Loading /> :
                <table className="table Customtable ">
                    <thead>
                        <tr>
                            <th scope="col">SR.no</th>
                            <th scope="col">Reserved Car</th>
                            <th scope="col">From date</th>
                            <th scope="col">To date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {reservData && reservData?.length !== 0 ?
                            reservData?.map((val, key) => (

                                <tr id={key}>
                                    <td >{key + 1}</td>
                                    <td >{`${val.rentedcar?.vehicleModel}`}</td>
                                    <td >{val.Datefrom}</td>
                                    <td >{val.Todate}</td>
                                    <td >{val.Active === true ? "active" : "cancled"}</td>
                                    <td>{user?._id === val.rentedByUser?._id && val.Active === true ?
                                        <button className='btn btn-outline-danger' onClick={() => cancelreservation(val._id, val?.rentedcar?._id)} disabled={loadingR} >cancel</button>
                                        : ""}</td>
                                </tr>

                            ))
                            :
                            <h3>no reservations</h3>
                        }
                    </tbody>

                </table>}
        </div>


    )
}

export default UserReservations