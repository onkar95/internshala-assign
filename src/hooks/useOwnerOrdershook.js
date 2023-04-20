import React from 'react'
import { useDispatch } from 'react-redux'

const useOwnerOrdershook = () => {

    const dispatch = useDispatch()
    const { userInfo: user, loading: userLoading } = useSelector(state => state.user)

    const { AllProducts } = useSelector(state => state.product)


    useEffect(() => {
        dispatch(getAllProducts())
    }, []);

    return { AllProducts }
}

export default useOwnerOrdershook