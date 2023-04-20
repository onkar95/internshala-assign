import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../Redux/Actions/ReservationAction';
import AdminOrders from './AdminOrders';

const AllOrders = () => {
    const dispatch = useDispatch()
    const { AllOrders } = useSelector(state => state.reserve)

    useEffect(() => {
        dispatch(getAllOrders())
        // eslint-disable-next-line
    }, [])

    return (
        <AdminOrders AllOrders={AllOrders} />
    )
}

export default AllOrders