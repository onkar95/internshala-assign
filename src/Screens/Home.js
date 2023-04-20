import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import './Screen.css'

const Home = () => {
  const navigate = useNavigate();

  const { userInfo, loading } = useSelector(state => state.user)

  useEffect(() => {
    if (userInfo.length !== 0) {
      return navigate(`${userInfo.Role}`)
    } else {
      return navigate("/user")
    }
    // eslint-disable-next-line
  }, [userInfo]);


  return (
    <div className='home'>
      {loading ? <Loading /> : ""}
    </div>
  )


}

export default Home