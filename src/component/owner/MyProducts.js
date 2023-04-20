import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../layout/Loader/Loading'
import { getMyProducts } from '../../Redux/Actions/ProductAction'
import ProductCard from '../common/product/ProductCard'
import Search from '../common/utils/Search'
import './owner.css'

const MyProducts = () => {

    const dispatch = useDispatch()


    const { userInfo: user, loading: userLoading } = useSelector(state => state.user)
    const { myProducts, loading, loading2, cardeleted, productDetailsUpdated, newproductAdded } = useSelector(state => state.product)
    const [MyProducts, setMyProducts] = useState();

    useEffect(() => {
        dispatch(getMyProducts())
        // eslint-disable-next-line
    }, [cardeleted, productDetailsUpdated, newproductAdded])

    useEffect(() => {
        const myProdycts = myProducts?.filter((key) => {
            return key?.carOwner.toString() === user?._id
        })
        setMyProducts(myProdycts)
        // eslint-disable-next-line
    }, [myProducts])

    return (
        <div>
            {userLoading || loading || loading2 ?
                <Loading />
                :
                <div className='myProducts' >

                    <div className='productList'>
                        <div className='search_div'>
                            <Search dataForSearch={myProducts} setFiltered={setMyProducts} />

                        </div>
                        <div className='owner_product_Map'>
                            {MyProducts?.length === 0 ?
                                <div className='center_text'><h3 > No product available</h3></div>
                                :
                                MyProducts?.map((val, key) => (
                                    <ProductCard id={key * 50} val={val} />
                                ))
                            }
                        </div>
                    </div>

                </div>

            }
        </div>
    )
}

export default MyProducts