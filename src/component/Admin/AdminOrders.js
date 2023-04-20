
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../layout/Loader/Loading';
import { getAllOrders } from '../../Redux/Actions/ReservationAction';
import '../../Screens/Screen.css'


const AdminOrders = () => {
    const { loading: userloading } = useSelector(state => state.user)
    const { loading, loadingR } = useSelector(state => state.reserve)

    const dispatch = useDispatch()
    const { AllOrders } = useSelector(state => state.reserve)

    useEffect(() => {
        dispatch(getAllOrders())
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {loading || userloading || loadingR ? <Loading />
                :
                <div>
                    <table className="table Customtable">
                        <thead>
                            <tr>
                                <th scope="col">SR.no</th>
                                <th scope="col">User Info</th>
                                <th scope="col">Reserved product</th>
                                <th scope="col">From date</th>
                                <th scope="col">To date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {AllOrders && AllOrders?.length !== 0 ?
                                AllOrders?.map((val, key) => (

                                    <tr id={key}>
                                        <td >{key + 1}</td>
                                        <td >{val.rentedByUser?.name}</td>
                                        <td >{`${val.rentedcar?.vehicleModel}`}</td>
                                        <td >{val.Datefrom}</td>
                                        <td >{val.Todate}</td>
                                        <td >{val.Active === true ? "active" : "cancled"}</td>
                                    </tr>

                                ))
                                :
                                <h3>no reservations</h3>
                            }
                        </tbody>

                    </table>
                </div>}

        </div>
    )
}

export default AdminOrders