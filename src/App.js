
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Screens/Home';
import Register from './Screens/Register';
import Profile from "./Screens/Profile";
import AllUsers from "./component/Admin/AllUsers";
import BookAProduct from "./component/User/BookAProduct";
import Login from "./Screens/Login";
import Reservations from "./Screens/Reservations";
import Admin from "./component/Admin/Admin";
import User from "./component/User/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyUser } from "./Redux/Actions/AuthActions";
import ProductDetail from "./component/common/product/ProductDetail";
import Allproduct from "./component/common/product/AllProducts";
import Owner from "./component/owner/Owner";
import AddProduct from "./component/owner/AddProduct";
import AllOrders from "./component/Admin/AllOrders";
import MyProducts from "./component/owner/MyProducts";
import EditCar from "./component/owner/EditCar";

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyUser())
    // eslint-disable-next-line
  }, [])


  return (
    <Router>

      <Routes>


        <Route index element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route excat path="/register" element={<Register />} />

        <Route excat path="/admin" element={<Admin />}>
          <Route index element={<Allproduct />} />
          <Route path="register" element={<Register />} />
          <Route exact path="productRegistration" element={<AddProduct />} />
          <Route path="allUsers" element={<AllUsers />} />
          <Route excat path="allOrders" element={<AllOrders />} />
          <Route excat path="ProductDetail/:id" element={<ProductDetail />} />
        </Route>

        <Route excat path="/user" element={<User />}>
          <Route index element={<Allproduct />} />
          <Route exact path="productReserve/:id" element={<BookAProduct />} />
          <Route excat path="allrerversations/:id" element={<Reservations />} />
          <Route excat path="ProductDetail/:id" element={<ProductDetail />} />
        </Route>

        <Route exact path="/owner" element={<Owner />} >
          <Route index element={<MyProducts />} />
          <Route exact path="addProducts" element={<AddProduct />} />
          <Route excat path="allrerversations/:id" element={<Reservations />} />
          <Route excat path="updatecar/:id" element={<EditCar />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
