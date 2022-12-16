import { createReducer } from "@reduxjs/toolkit";
import artistsActions from "../actions/artistsactions";

const {getArtists, getFilteredArtists, deleteArtist} = artistsActions
const initialState = {
    artists: [],
    loading: false,
    message: ''
}

const artistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getArtists.pending, (state, action) => {
            return {...state, loading: true}
        })
        .addCase(getArtists.fulfilled, (state, action) => {
            return {...state, ...action.payload, loading: false}
        })
        .addCase(getArtists.rejected, (state, action) => {
            return { ...state, loading: false, message: action.payload.message}
        })
        .addCase(getFilteredArtists.pending, (state, action) => {
            return {...state, loading: false}
        })
        .addCase(getFilteredArtists.fulfilled, (state, action) => {
            if(action.payload.success){
                return {...state, ...action.payload, loading: false}
            } else{
                return {...state, artists: [] , message: action.payload.message}
            }
        })
        .addCase(getFilteredArtists.rejected, (state, action) => {
            return { ...state ,loading: false, message: action.payload.message}
        })
        .addCase(deleteArtist.pending, (state, action) => {
            return {...state, loading: true}
        })
        .addCase(deleteArtist.fulfilled, (state, action) => {
            let filtered = state.artists.filter(el => el._id !== action.payload.id)
            return {...state, message: action.payload.message, artists: filtered}
        })
        .addCase(deleteArtist.rejected, (state, action) => {
            return { ...state, loading: false, message: action.payload.message}
        })
})

export default artistsReducer