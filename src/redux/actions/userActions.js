import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {BASE_URL} from "../../api/url";

const login = createAsyncThunk('login', async (datos) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/auth/sign-in`, datos)
        return {
            success: true,
            response: user.data.response,
            res: user.data,
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const reLogin = createAsyncThunk('reLogin', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
        let user = await axios.post(`${BASE_URL}/api/auth/token`, null, headers)
        return {
            success: true,
            response: {
                user: user.data.response.user,
                token
            }
        }

    } catch (error) {
        return {
            success: false,
            response: error.message
        }
    }
})

const logout = createAsyncThunk('logout', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` }}
    try {
        let user = await axios.post(`${BASE_URL}/api/auth/sign-out`, null, headers)
        return {
            success: true,
            response: user.data.message
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})



const userActions = {
    login,
    reLogin,
    logout,
}

export default userActions