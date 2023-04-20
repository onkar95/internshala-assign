import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils";





//owner
export const getAllOrdersForOwner = createAsyncThunk(
    'OrdersForOwner',
    async (args, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };
            const { data } = await axios.get(`${BASE_URL}/rent/ordersForOwner`, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)

//user


export const getAllOrdersByUsers = createAsyncThunk(
    'user/Reservations',
    async (args, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };
            const { data } = await axios.get(`${BASE_URL}/rent/userOrders`, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)
//admin

export const getAllOrders = createAsyncThunk(
    'allOrders',
    async (args, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };

            const { data } = await axios.get(`${BASE_URL}/rent/admin/allOrders`, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)
export const getAdminOrdersByUsers = createAsyncThunk(
    'admin/Reservations',
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };
            const { data } = await axios.get(`${BASE_URL}/rent/admin/userOrders/${id}`, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)

export const getAdminOrdersOnProduct = createAsyncThunk(
    'admin/product/reservation',
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };
            const { data } = await axios.get(`${BASE_URL}/rent/admin/productReservations/${id}`, config)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)



///
export const filteredReservations = createAsyncThunk(
    'product/filterReserv',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const { AllReservations } = getState()
            if (AllReservations?.length !== 0) {
                const filter = AllReservations && AllReservations.filter((key) => {
                    return key.productId?.toLowerCase().includes(id?.toLowerCase()) || key.UserId?.toLowerCase().includes(id?.toLowerCase())
                })
                return filter
                // setFilteredReservations(filter)
            }
            return AllReservations;

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const UpdateAvailability = createAsyncThunk(
    'product/updateAvail',
    async ({ Availability, BId }, { getState, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const obj = {
                Availability
            }
            const { data } = await axios.put(`${BASE_URL}/product/updateproductAvailability/${BId}`, obj, config)
            return data;

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
export const cancleReservation = createAsyncThunk(
    'cancleOrder',
    async ({ id }, { rejectWithValue }) => {
        try {

            const token = localStorage.getItem('token')
            const config = { headers: { "x-access-token": `${token}` } };

            const { data } = await axios.delete(`${BASE_URL}/rent/cancleOrder/${id}`, config)
            return data;

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

export const updateReservedproductRating = createAsyncThunk(
    'reserve/rating',
    async ({ rating, Reservationid }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/reserve/updateReservation2/${Reservationid}`, { rating })
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