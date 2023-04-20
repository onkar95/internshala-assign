import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import Loading from "../layout/Loader/Loading";
import Navbar from "../layout/navbar/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const { userInfo: user, loading, verified } = useSelector((state) => state.user);




  useEffect(() => {
    if (verified === false || verified === undefined) {
      return navigate('/')
    }
    // eslint-disable-next-line
  }, [verified]);

  return (

    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Navbar />
          <div className="profileContainer">
            <div className="profileContainer_1">
            </div>
            <div className="profileContainer_2">
              <section>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </section>
              <section>
                <h4>Email</h4>
                <p>{user.email}</p>
              </section>
              <section>
                <h4>Joined On </h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </section>
            </div>
            <div className="profileContainer_3">
              <section>
                <h4>Role</h4>
                <p>{user.Role}</p>
              </section>

            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
