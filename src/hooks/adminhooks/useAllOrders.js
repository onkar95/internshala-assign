import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../Redux/Actions/ReservationAction'

export const useAllOrders = () => {
    const dispatch = useDispatch()

    const { userInfo: user } = useSelector(state => state.user);
    const { AllOrders } = useSelector(state => state.reserve);



    useEffect(() => {
        if (user?.Role === "admin") {
            dispatch(getAllOrders())
        }
        // eslint-disable-next-line
    }, [user]);

    return { AllOrders }
}
