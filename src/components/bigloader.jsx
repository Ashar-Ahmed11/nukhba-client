import React from 'react'
import logo from './nukhbaLogo1.png'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

export default function BigLoader() {

    const context = useContext(NoteContext)
    const { checkouter, mainLoader, anotherLoader, imgIsLoaded, navLoader, getProductLoader } = context
    const color = "#F4B92D"
    useEffect(() => {

        window.scrollTo(0, 0)
    }, [])

    const [index, setindex] = useState(false)
    useEffect(() => {
        if (mainLoader || getProductLoader) {
            setindex(true)
        }
        else {
            setindex(false)
        }
    }, [getProductLoader, mainLoader])

    const [myClass, setMyClass] = useState("")



    return (
        <>
            {!checkouter && <>{mainLoader&&<div style={{}}>
                <div style={{ opacity:'1', zIndex:'9999999' }} className={`mainLoader `}>
                    <div className="d-flex justify-content-center p-5 m-5">
                        <div className="p-5 m-5">
                            <div className="d-flex flex-column">
                                
                                <img className='glow' style={{ width: '200px', zIndex: "9999999" }} src={logo} alt="" />
                                {/* <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-border" style={{ width: "70px", height: "70px", color: color }} role="status">
                                    <span className="visually-hidden">Loading...</span>

                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           } </>}
        </>

    )
}