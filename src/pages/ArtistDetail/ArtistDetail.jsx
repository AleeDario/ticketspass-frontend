import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../api/url'
import { Spinner } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons';
import { Link as Navlink } from 'react-router-dom'
import './ArtistDetail.css'

const ArtistDetail = () => {
   let { id } = useParams()
   let [artist, setArtist] = useState({})
   let [load, setLoad] = useState(true)
   let [error, setError] = useState('')
   useEffect(() => {
      axios.get(`${BASE_URL}/api/artists/${id}`)
         .then(res => {
            setArtist(res.data.data)
            setLoad(false)
         })
         .catch(err => {
            setLoad(false)
            err.response ?
               setError(err.response.data.message) :
               setError(err.message)
         })
   }, [id])
   return (
      <>
         <div className='backNav'></div>
         <div className='w-100 mb-2 d-flex justify-content-center align-items-center'>
            {
               load ?
                  <Spinner /> :
                  artist.name ?
                     <div className='w-100 pb-4'>
                        <div className='detail__image--container' style={{ backgroundImage: `url(${artist.photo})` }}>
                           <h2 className='text-light text-detail text-center'>{artist.name}</h2>
                        </div>

                        <div className='d-flex flex-column align-items-center flex-lg-row'>
                           <div className='pt-5 d-flex container-details'>
                              <div className='d-flex flex-column px-4 '>
                                 <p>{artist.description}</p>
                                 <p><span className='genre__key'>Genre:</span> {artist.genre.join(", ")}</p>
                                 <span className='genre__key text-center fs-5'>Social Media</span>
                                 <div className='d-flex justify-content-center gap-5 p-5'>
                                    <div>
                                       <a href={artist.youtubeChannel} className='d-flex flex-column align-items-center gap-2' style={{ textDecoration: 'none' }}>
                                          <SocialIcon className="icon-social" network="youtube" fgColor="#ffffff" style={{ height: 40, width: 40 }} /> Youtube Channel
                                       </a>
                                    </div>
                                    <div>
                                       <a href={artist.spotifyPlaylist} className='d-flex flex-column align-items-center gap-2' style={{ textDecoration: 'none' }}>
                                          <SocialIcon className="icon-social" network="spotify" fgColor="#ffffff" style={{ height: 40, width: 40 }} /> Spotify Playlist
                                       </a>
                                    </div>

                                 </div>
                              </div>
                              <div className='d-flex justify-content-center w-100'>
                                 <iframe src={artist.youtubeVideo} title={artist.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                           </div>
                        </div>
                     </div> :
                     <h2 className='text-center'>{error}</h2>
            }
         </div>
      </>
   )
}

export default ArtistDetail