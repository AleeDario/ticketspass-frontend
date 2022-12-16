import React from 'react'

export default function ButtonNav(props) {
    let { fx } = props

    return (
        <button onClick={fx} className='nav-btn-cart' style={{ backgroundColor: 'transparent', border: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40"
                className="bi bi-person-circle menuUser" viewBox="0 0 16 16">
                <path fill='white' d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                <path fill='white' fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
                </path>
            </svg>
        </button>
    )
}