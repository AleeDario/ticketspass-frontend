import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product'
import Swal from 'sweetalert2'
import { Link as Navlink } from 'react-router-dom'
import axios from 'axios';

export default function Cart() {

    const [cart, setCart] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [reload])

    function clearCart() {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear cart!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('cart', JSON.stringify([]))
                setReload(!reload)
                Swal.fire(
                    'Deleted!',
                    'Your cart has been cleared.',
                    'success'
                )
            }
        }
        )
    }

    return (
        <>
            {
                cart.length > 0 ? (
                    <>
                        <table className="table container">
                            <thead>
                                <tr>
                                    <th className="text-black text-center fs-1 fw-bold" colspan="5">Carrito de compras</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-info text-center fw-semibold">Imagen</td>
                                    <td className="text-info text-center fw-semibold">Producto</td> 
                                    <td className="text-info text-center fw-semibold">Precio Unitario</td>
                                    <td className="text-info text-center fw-semibold">Cantidad</td>
                                    <td className="text-info text-center fw-semibold">Precio Total</td>
                                </tr>
                            </tbody>
                            <tbody>
                                {
                                    cart.map((item, index) => <Product cart={cart} item={item} key={index} fx={() => setReload(!reload)} />)
                                }
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="text-info text-center fw-semibold" colspan="4">Total</td>
                                    <td className="text-info text-center fw-semibold">${
                                        cart.reduce((acc, item) => acc + item.price, 0)
                                    }</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center'>
                            <div className="d-flex justify-content-around w-50">
                                <p className="btn btn-danger" onClick={clearCart}>Vaciar Carrito</p>
                                <Navlink to="/"><p className="btn btn-primary">Seguir Comprando</p></Navlink>
                                <p className="btn btn-success" onClick={async () => {
                                    const preference = {
                                        items: cart.map(item => {
                                            return {
                                                title: item.title,
                                                unit_price: item.price,
                                                quantity: 1,
                                                currency_id: "ARS",
                                                id: item._id
                                            }
                                        })
                                    };
                                    let response = await axios.post('https://api.mercadopago.com/checkout/preferences', preference , {
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer APP_USR-5455371630357360-121409-16f3245feba61f81a4037002eaa8acfd-158410015`
                                        }
                                    })

                                    window.open(response.data.init_point, "_blank")

                                }}>Abonar</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-5">
                        <img className="img-fluid" src="../assets/img/cartClear.png" alt="StockClear" width="300px" />
                        <h1>There are no items in the cart</h1>
                    </div>
                )
            }
        </>
    )
}