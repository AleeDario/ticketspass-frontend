import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product'
import Swal from 'sweetalert2'
import { Link as Navlink } from 'react-router-dom'
import axios from 'axios';
import { MERCADO_PAGO_KEY } from "../../api/url";

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
                        <div className='backNav'></div>
                        <table className="table container-fluid">
                            <thead>
                                <tr>
                                    <th className="text-black text-center fs-1 fw-bold" colSpan="5">Carrito de compras</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-main text-center fw-semibold">Imagen</td>
                                    <td className="text-main text-center fw-semibold">Producto</td>
                                    <td className="text-main text-center fw-semibold">Precio Unitario</td>
                                    <td className="text-main text-center fw-semibold">Cantidad</td>
                                    <td className="text-main text-center fw-semibold">Precio Total</td>
                                </tr>
                            </tbody>
                            <tbody>
                                {
                                    cart.map((item, index) => <Product cart={cart} item={item} key={index} fx={() => setReload(!reload)} />)
                                }
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="text-main text-center fw-semibold" colSpan="4">Total</td>
                                    <td className="text-main text-center fw-semibold">${
                                        cart.reduce((acc, item) => acc + item.category.price, 0)
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
                                        paymode: "modal",
                                        back_urls: {
                                            success: "http://localhost:3000/",
                                            failure: "http://localhost:3000/",
                                            pending: "http://localhost:3000/"
                                        },
                                        payer: {
                                            name: "Lalo",
                                            surname: "Landa",
                                            email: "aleenetflix1995@gmail.com",
                                            phone: {
                                                area_code: "11",
                                                number: 22223333
                                            },
                                            address: {
                                                street_name: "False",
                                                street_number: 123,
                                                zip_code: "1111"
                                            }
                                        },
                                        items: cart.map(item => {
                                            return {
                                                title: item.title,
                                                description: 'Dispositivo móvil de Tienda e-commerce',
                                                picture_url: item.photo,
                                                unit_price: item.category.price,
                                                quantity: 1,
                                                currency_id: "ARS",
                                                id: item._id
                                            }
                                        })
                                    };
                                    let response = await axios.post('https://api.mercadopago.com/checkout/preferences', preference, {
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${MERCADO_PAGO_KEY}`
                                        }
                                    })
                                    console.log(response)
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
