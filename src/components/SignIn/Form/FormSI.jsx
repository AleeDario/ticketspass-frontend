import React, { useRef } from "react";
import Swal from 'sweetalert2';
import '../../SignUp/Form/Form.css'
import { useDispatch } from 'react-redux'
import userActions from "../../../redux/actions/useractions";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

export default function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { login } = userActions
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()

    async function saveData(e) {
        e.preventDefault()
        let userValue = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            let response = await dispatch(login(userValue)).unwrap()
            let res = response.res
            if (res.success) {
                Swal.fire({
                    title: res.message,
                    html: "We're redirecting you to Home Page...",
                    timer: 2200,
                    timerProgressBar: true,
                    willClose: () => {
                        navigate('/')
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'We found an error...',
                    text: `Errors: `,
                })
            }
        } catch (error) {
            console.log(error);
            if (Array.isArray(error)) {
                Swal.fire({
                    icon: "error",
                    title: error,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Wrong email or password.",
                    showConfirmButton: true,
                });
            }
        }
    }
    return (
        <>
            <div className='backNav'></div>
            <form ref={formRef} className="formSign pb-5" >
                <div>
                    <div className="form-shadows-content">
                    <div className="form-title-div">
                        <h2 className="title2Sign">Login to Your Account</h2>
                    </div>
                    <div className="d-flex flex-column align-items-center gap-2">
                        <h5>Login usins social networks</h5>
                        <div className="social-networks">
                            <SocialIcon className="icon-social" network="facebook" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                            <SocialIcon className="icon-social" network="instagram" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                            <SocialIcon className="icon-social" network="google" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                        </div>
                    </div>
                </div>
                <div className="form-bodySign">
                    <label htmlFor="">Email</label>
                    <input
                        id="Email"
                        type="email"
                        placeholder="YourEmail@mail.com"
                        className="form__input"
                        ref={emailRef}
                        required
                    />
                    <label htmlFor="">Password</label>
                    <input
                        id="Password"
                        type="password"
                        placeholder="*********"
                        className="form__input"
                        ref={passwordRef}
                        required
                    />
                    <div className="submitSign">
                        <input onClick={saveData} className="submit2Sign" type='button' value='Login' />
                    </div>
                </div>
                </div>
                
                <div className='right'>

                </div>
            </form>
        </>
    );
}