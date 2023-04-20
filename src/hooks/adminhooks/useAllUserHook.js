import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../Redux/Actions/UserAction'
import { resetUserVariables } from '../../Redux/Reducers/UserSlice'


export const useAllUserHook = () => {
    const dispatch = useDispatch()

    const { AllUser, userDeleted, userUpdated, userCreated, verified } = useSelector(state => state.user)

    useEffect(() => {

        if (verified === true && (userDeleted || userUpdated || userCreated || AllUser?.length === 0)) {
            dispatch(getAllUser())
            dispatch(resetUserVariables())
        }
        // eslint-disable-next-line
    }, [userDeleted, userUpdated, userCreated, AllUser]);
    return { AllUser }
}

export default useAllUserHook




