import { createSlice } from '@reduxjs/toolkit'
import { Userlogout } from '../Actions/AuthActions'
import { addNewproduct, deleteCar, getMyProducts, getAllProducts, getSingleProduct, reserveproduct, updateproductRating, updateproduct } from '../Actions/ProductAction'
import { UpdateAvailability } from '../Actions/ReservationAction'


const initialState = {
    AllProducts: [],
    myProducts: [],
    singleProduct: [],
    filteredProduct: [],
    loading: false,
    loading2: false,
    error: null,

    filtered: false,
    AllproductsFetched: false,
    cardeleted: false,
    ratingUpdated: false,
    productDetailsUpdated: false,
    updateproductAvil: false,
    newproductAdded: false,
    productReserved: false,
}

const Product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetproductVariables: (state) => {
            if (state.cardeleted) state.cardeleted = false
            if (state.productDetailsUpdated) state.productDetailsUpdated = false
            if (state.newproductAdded) state.newproductAdded = false
            if (state.productReserved) state.productReserved = false
        }
    },

    extraReducers: {

        // logout user
        [Userlogout.pending]: (state) => {
            state.loading = true
        },
        [Userlogout.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllproductsFetched = false
            state.ReservationsFetched = false
        },
        [Userlogout.rejected]: (state, { payload }) => {
            state.loading = false
        },
        //reserve
        [reserveproduct.pending]: (state) => {
            state.loading = true
            state.error = null
            state.productReserved = false
        },
        [reserveproduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.productReserved = true
            state.AllproductsFetched = false
            state.ReservationsFetched = false
        },
        [reserveproduct.rejected]: (state, { payload }) => {
            state.loading = false
            state.productReserved = false
            state.error = payload
        },
        // get all products
        [getAllProducts.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllProducts = payload
        },
        [getAllProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // get all products
        [getMyProducts.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getMyProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.myProducts = payload
        },
        [getMyProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // get getSingleproduct products
        [getSingleProduct.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getSingleProduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.singleProduct = payload
        },
        [getSingleProduct.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // delete product 
        [deleteCar.pending]: (state) => {
            state.loading = true
            state.error = null
            state.cardeleted = false
        },
        [deleteCar.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.cardeleted = true
            state.AllproductsFetched = false
        },
        [deleteCar.rejected]: (state, { payload }) => {
            state.loading = false
            state.cardeleted = false
        },

        // get user details

        [updateproductRating.pending]: (state) => {
            state.loading2 = true
            state.ratingUpdated = false
        },
        [updateproductRating.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = true
            state.AllproductsFetched = false
        },
        [updateproductRating.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = false
        },

        [updateproduct.pending]: (state) => {
            state.loading2 = true
            state.productDetailsUpdated = false
        },
        [updateproduct.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.productDetailsUpdated = true
            state.AllproductsFetched = false
        },
        [updateproduct.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.productDetailsUpdated = false
        },

        // update
        [UpdateAvailability.pending]: (state) => {
            state.loading2 = true
            state.error = null
            state.updateproductAvil = false
        },
        [UpdateAvailability.fulfilled]: (state) => {
            state.loading2 = false
            state.updateproductAvil = true
            state.AllproductsFetched = false
        },
        [UpdateAvailability.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.error = payload
            state.updateproductAvil = false
        },


        //add new product
        [addNewproduct.pending]: (state) => {
            state.loading2 = true
            state.newproductAdded = false
        },
        [addNewproduct.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.newproductAdded = true
            state.AllproductsFetched = false
        },
        [addNewproduct.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.newproductAdded = false
        },
    },
})

// const Product

export const { resetproductVariables } = Product.actions

export default Product.reducer