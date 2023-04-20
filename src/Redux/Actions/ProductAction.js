
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils"


export const getAllProducts = createAsyncThunk(
    'getAllCars',
    async (arg, { getState, rejectWithValue }) => {
        try {

            const { data } = await axios.get(`${BASE_URL}/car/allcars`)
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const getMyProducts = createAsyncThunk(
    'getmyProducts',
    async (arg, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };

            const { data } = await axios.get(`${BASE_URL}/car/carsOfAgency`, config)
            return data
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const deleteCar = createAsyncThunk(
    'deleteCar',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };
            const { data } = axios.delete(`${BASE_URL}/car/owner/deleteCar/${id}`, config)

            return data;

        } catch (error) {
            console.log(error)
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const updateproductRating = createAsyncThunk(
    'product/updateproductRating',
    async ({ rating, comment, productID, userID }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/product/RatingForproduct/${productID}`, { rating, comment, productID, userID })
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const addNewproduct = createAsyncThunk(
    'product/addNewproduct',
    async (dataobj, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post('/product/addproduct', dataobj)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const reserveproduct = createAsyncThunk(
    'rentcar',
    async (obj, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/rent/rentcar`, obj)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const getSingleProduct = createAsyncThunk(
    'singleProduct',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/car/Singlecar/${id}`)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const updateproduct = createAsyncThunk(
    'product/updateproduct',
    async ({ id, dataobj }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/car/owner/updatecar/${id}`, dataobj)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
) 
