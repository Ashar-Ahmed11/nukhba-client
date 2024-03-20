import React from 'react'
import CartItem from './cartItem'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Spinner from './spinner'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
export default function Cart() {
    const context = useContext(noteContext)
    const { cart, loader, addProduct, totalCal, settotalCal, country } = context
    const color = "#212427"
    const ref = useRef(null)
    let total = 0

    const totaller = () => {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            total = total + (cart[i].quantity * cart[i].price);
        }

        return total;
    };

    useEffect(() => {

        settotalCal(totaller())
    }, [addProduct])

    // console.log(totalCal)







    // useEffect(() => {
    //  console.log(totaller())

    // }, [addProduct])




    return (
        <div>

            <div style={{ backgroundColor: "#ffffff", height: '100%' }} className="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header" style={{ borderBottom: `1px solid ${color}` }}>
                    <h5 style={{ color: color }} className="offcanvas-title" id="staticBackdropLabel">CART</h5>
                    <button ref={ref} style={{ color: color, backgroundColor: '#ffffff' }} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">

                    </button>
                </div>

                {/* PROGRESS BAR */}
                {/* <div style={{borderRadius:'0',height:'5px',backgroundColor:'#000000'}} className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{width: "50%",backgroundColor:'#a38235'}}></div>
                </div> */}
                <div style={{ overflowX: 'hidden' }} className="offcanvas-body">

                    <div style={{ transition: 'all 0.7s ease' }} >

                        {/* {loader? <div className="d-flex justify-content-center my-5 p-5">
                    <Spinner/>  
                    </div>:cart.line_items.map((e)=>{
                        return  <CartItem data={e}/>
                    })}
                   */}


                        {cart && cart.map((e, i) => {
                            return <CartItem data={e} />
                        })}


                    </div>
                </div>
                <div className="offcanvas-footer p-3" style={{ borderTop: `1px solid ${color}` }}>
                    <div className="row mx-2">
                        <div style={{ color: color }} className="col-6"><p>SUBTOTAL</p></div>
                        <div style={{ color: color, textAlign: 'end' }} className="col-6"><p>{totaller().toLocaleString('en-US', {
                            style: 'currency',
                            currency: country == "Pakistan" ? 'PKR' : 'SAR',
                        })}</p></div>
                    </div>
                    {totalCal !== 0 && <div className="d-flex">
                        <Link onClick={() => ref.current.click()} to="/checkout" className="btn" style={{ backgroundColor: '#f4b92d', color: 'white', width: '100%' }}>Check Out</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}