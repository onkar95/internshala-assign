import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUsers } from '../Redux/Actions/ReservationAction'

const useFetchUserReservations = () => {

    const dispatch = useDispatch()

    const { userInfo: user } = useSelector(state => state.user)
    const { productReserved } = useSelector(state => state.product)
    const { userOrders, cancledReservation } = useSelector(state => state.reserve)
    console.log(cancledReservation, productReserved)
    let [reservData, setreservData] = useState([])


    useEffect(() => {
        if (user?.Role === "user") {
            dispatch(getAllOrdersByUsers())
        }
        // eslint-disable-next-line
    }, [cancledReservation, productReserved,]);

    useEffect(() => {
        if (user?.Role === "user") {
            setreservData(userOrders)
        } else {
            setreservData([])
        }
    }, [userOrders, user]);


    return { reservData, userOrders }


}



export default useFetchUserReservations

