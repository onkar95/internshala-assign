import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAllUserHook from '../../hooks/adminhooks/useAllUserHook';
import Loading from '../../layout/Loader/Loading';
import { deleteUser } from '../../Redux/Actions/UserAction';


const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user, loading, verified } = useSelector(state => state.user)
  const { AllUser } = useAllUserHook()


  if (user.length === 0 || verified === false) {
    return navigate('/user')
  }

  const handelDelete = (id) => {
    if (window.confirm("Do you really want to delete") === true) {

      dispatch(deleteUser({ id }))
    }
  }
  return (
    <>
      {loading ?
        <Loading /> :
        <div>
          {user?.Role === "admin" ?
            <div className='resta m-2'>
              <button className=' btn btn-warning resta' onClick={() => navigate(`/register`)}>
                Add User
              </button>
            </div>
            : ""
          }
          <h3>all users</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
              AllUser?.map((val, key) => (

                <div className="card" id={key} style={{ width: "18rem", margin: "5px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Name:{val.name}</h5>
                    <p className="card-text">Email: {val.email}</p>
                    <p className="card-text"> Role:{val.Role}</p>

                    {/* <button className=' mx-3 btn-sm  btn btn-outline-primary'
                      onClick={() => handelUserReservation(val?._id)}>Reservations</button>
                    <button className=' mx-3 btn-sm  btn btn-outline-warning' onClick={() => getUser(val?._id)}>Edit</button> */}
                    <button className='mx-3 btn-sm btn btn-outline-danger' onClick={() => handelDelete(val?._id)}>delete</button>
                  </div>
                </div>

              ))
            }

          </div>
        </div>

      }
    </>
  )
}

export default AllUsers