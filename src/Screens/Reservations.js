
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AdminOrders from '../component/Admin/AdminOrders';
import Orders from '../component/owner/Orders';
import UserReservations from '../component/User/UserReservations';

import { useAllOrders } from '../hooks/adminhooks/useAllOrders';
import useFetchUserReservations from '../hooks/useFetchUserReservations'
import './Screen.css'


const AllReservations = () => {
    const { id } = useParams()
    const { userInfo: user } = useSelector(state => state.user)
    const { reservData } = useFetchUserReservations({ id })
    const { AllOrders } = useAllOrders({ id })


    return (
        <>
            {
                user?.Role === "admin" ?
                    <AdminOrders AllOrders={AllOrders} />
                    : user?.Role === "user" ?
                        <UserReservations reservData={reservData} />
                        : user?.Role === "owner" ?
                            <Orders />
                            :
                            ""


            }
        </>
    )
}

export default AllReservations



