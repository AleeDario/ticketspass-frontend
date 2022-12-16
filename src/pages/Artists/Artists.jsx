import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ArtistsCard from '../../components/Artists/ArtistsCard'
import artistsActions from '../../redux/actions/artistsactions'
import axios from 'axios'
import { BASE_URL } from '../../api/url'
import './Artists.css'
import filterArtistActions from '../../redux/actions/fiterArtistActions'
import Search from '../../utils/search/Search'

export const Artists = () => {

    let { artists, loading, message } = useSelector(state => state.artistsReducer)
    let filter = useSelector(state => state.filterArtistReducer)
    let dispatch = useDispatch()
    let { getArtists, getFilteredArtists } = artistsActions
    let { setChecked, setSearched } = filterArtistActions
    let [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/artists`)
            .then(res => {
                let allGenres = Array.from(new Set(res.data.data.map(el => el.genre).reduce((el1, el2) => el1.concat(el2), [])))
                setGenres(allGenres);
            })
            .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        if (artists.length < 1 && filter.name === '' && filter.genre.length < 1) {
            dispatch(getArtists())
        }
        else {
            dispatch(getFilteredArtists(filter))
        }// eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(getFilteredArtists(filter))// eslint-disable-next-line
    }, [filter])

    let checkHandler = (e) => {
        let auxArray = [...filter.genre]
        e.target.checked ?
            auxArray.push(e.target.value) :
            auxArray = auxArray.filter(el => el !== e.target.value)
        let checked = auxArray
        dispatch(setChecked(checked))
    }

    let searchHandler = (e) => {
        let searched = e.target.value.trim()
        dispatch(setSearched(searched))
    }

    return (
        <>
            <div className='backNav'></div>
            <div className='full-container-fluid pt-4'>
                <h1 className='text-center'>Artists</h1>
                <div className="d-flex justify-content-between flex-wrap gap-4 px-5">
                    <fieldset className='d-flex flex-column'>
                        <legend className='fs-5'>Search by genre:</legend>
                        <div className='d-flex gap-5 align-items-center justify-content-center flex-wrap mb-3'>
                            {
                                genres.length > 0 ?
                                    genres.map(el =>
                                        <label key={el} className='d-flex align-items-center gap-1'>
                                            <input className='mb-0' checked={filter.genre.includes(el)} onChange={checkHandler} type="checkbox" value={el} /><span>{el}</span>
                                        </label>
                                    ) :
                                    <p>Cannot get genres</p>
                            }
                        </div>
                    </fieldset>
                    <Search placeholder="Search by artist" onChange={searchHandler} defaultValue={filter.name} />
                </div>
                <div className='d-flex w-100 justify-content-around gap-3 align-items-center p-5 flex-wrap'>
                    {
                        loading ?
                            <Spinner /> :
                            artists.length > 0 ?
                                artists.map(el => <ArtistsCard key={el._id} id={el._id} name={el.name} photo={el.photo} />) :
                                <h2>{message}</h2>
                    }
                </div>
            </div>
        </>
    )
}
