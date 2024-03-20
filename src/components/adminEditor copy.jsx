import React, { useContext } from 'react'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import NoteContext from '../context/notes/noteContext'






export default function RegionChecker() {
    const closeRef = useRef(null)



    const context = useContext(NoteContext)
    const { country, setCountry, products, setProducts, openRef,setCart } = context

    useEffect(() => {
        if(!country){
        openRef.current.click()
    }
 
    }, [country])

    const token = localStorage.getItem('auth-token')



    const [buttonActive, setButtonActive] = useState(true)



    const closeButton = () => {
        closeRef.current.click()
        setImageEditor(false)
        setCarousalEditor(false)
        setFooterImage(false)
        setText('Hello')
    }
    console.log(country)
    



    const color = "#F4B92D"
    return (
        <div>



            <button hidden="true" style={{display:'none'}} ref={openRef} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropTWO">
                Launch demo modal
            </button>

            <div className="container">
                <div style={{ padding: '0px', zIndex: '2147483647',backdropFilter:'blur(5px)' }} class="modal fade" id="staticBackdropTWO" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropTWOLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered py-5">
                        <div style={{borderRadius:"15px",color:"#212427"}} class="modal-content border-0">
                            <div class="modal-header">
                                <h3 class="modal-title">Select Your Country</h3>
                                {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div class="modal-body">
                                <p>By changing the location, all items will be removed from your Shopping Bag and delivery options of that location will be applied.</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">

                                <button onClick={() => { setCountry("Pakistan") }} data-bs-dismiss="modal" type="button" class="btn" style={{ backgroundColor: "#ffffff", borderColor: '#212427', color: '#212427' }} >Pakistan</button>
                                <button onClick={() => { setCountry("Saudi-Arabia") }} data-bs-dismiss="modal" type="button" class="btn" style={{ backgroundColor: "#ffffff", borderColor: '#212427', color: '#212427' }} >Saudi Arabia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}