/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "../../common/common.css"
import './product.css'
import { AiOutlinePlus } from "react-icons/ai";
import Filters from '../utils/Filters';
import ProductCard from './ProductCard';
import Search from '../utils/Search';
import Loading from '../../../layout/Loader/Loading';
import { getAllProducts } from '../../../Redux/Actions/ProductAction';
import { resetproductVariables } from '../../../Redux/Reducers/ProductSlice';

const AllProducts = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const { userInfo: user, loading: userLoading } = useSelector(state => state.user)
  const { AllProducts, myProducts, loading, loading2, cardeleted, productDetailsUpdated, newproductAdded, productReserved } = useSelector(state => state.product)
  const [Filtered, setFiltered] = useState();
  const data = Filtered ? Filtered : AllProducts

  useEffect(() => {
    if (AllProducts.length === 0 || (cardeleted || productDetailsUpdated || newproductAdded || productReserved)) {
      dispatch(getAllProducts())
      dispatch(resetproductVariables())
    }
  }, [cardeleted, productDetailsUpdated, newproductAdded, productReserved])


  console.log(AllProducts)
  console.log(myProducts)
  return (
    <>
      {userLoading || loading || loading2 ?
        <Loading />
        :
        <div className='Allproducts' >
          <div className='filter_box'>
            <div className='AllproductsHeader'>
              <h3 className="">All Products</h3>

            </div>
            <Filters AllProducts={AllProducts} setFiltered={setFiltered} />
          </div>

          <div className='productList'>
            <div className='search_div'>
              <Search dataForSearch={AllProducts} setFiltered={setFiltered} />
              {user?.Role === "admin" ? <button className=' btn btn-warning addNproduct_btn ' onClick={() => navigate(`/${user?.Role}/productRegistration `)}>
                <AiOutlinePlus /> Add product
              </button> : ""}
            </div>
            <div className='product_Map'>
              {data?.length === 0 ?
                <div className='center_text'><h3 > No product available</h3></div>
                :
                data?.map((val, key) => (
                  <ProductCard id={key * 50} val={val} />

                ))
              }


            </div>
          </div>

        </div>

      }

    </>
  )
}

export default AllProducts

