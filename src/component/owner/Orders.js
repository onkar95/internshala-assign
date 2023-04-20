import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../layout/Loader/Loading';
import { getAllOrdersForOwner } from '../../Redux/Actions/ReservationAction';

const Orders = () => {
    const { loading: userloading } = useSelector(state => state.user)
    const { loading, loadingR, ownerOrders } = useSelector(state => state.reserve)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrdersForOwner())
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {loading || userloading || loadingR ? <Loading /> :
                <table className="table Customtable ">
                    <thead>
                        <tr>
                            <th scope="col">SR.no</th>
                            <th scope="col">Reserved car</th>
                            <th scope="col">Reserved by</th>
                            <th scope="col">From Date </th>
                            <th scope="col">To date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {ownerOrders && ownerOrders?.length !== 0 ?
                            ownerOrders?.map((val, key) => (

                                <tr id={key}>
                                    <td >{key + 1}</td>
                                    <td >{`${val.rentedcar?.vehicleModel}`}</td>
                                    <td >{`${val.rentedByUser?.name},${val.rentedByUser?.phoneNo}`}</td>
                                    <td >{val.Datefrom}</td>
                                    <td >{val.Todate}</td>
                                    <td >{val.Active === true ? "active" : "cancled"}</td>
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

export default Orders