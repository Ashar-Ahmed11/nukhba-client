import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from 'react-spinners/MoonLoader'
import { useKeenSlider } from 'keen-slider/react'
import { Image, Transformation } from 'cloudinary-react'
import ScrollAnimation from 'react-animate-on-scroll'
import ResizePlugin from './Plugins/ResizePlugin'
import MutationPlugin from './Plugins/MutationObserver'
export default function ProductItem({ data }) {
    const context = useContext(NoteContext)
    const { addProduct, getProduct, setMainLoader, refreshPage,country } = context
    const { name, assets, price, description, _id, permalink, sku, quantity } = data

    const [scaler, setScaler] = useState("2.15")
    useEffect(() => {

        if (name == "Leather Wallet for Men in Black Color") {
            setScaler("2.6")
        }
        if (name == "Leather Wallet for Men in Dark Brown Color") {
            setScaler("2.5")
        }
        if (name == "Leather Wallet for Men in Dark Camel Color") {
            setScaler("2.1")
        }
        if (name == "Reversible Brown and Black Belt for Men") {
            setScaler("1.25")

        }
        if (name.match("Cross Body Messenger Bag")) {
            setScaler("1.7")
        }
        if (name.match("Handbag")) {
            setScaler("1.5")

        }

        if (name.match("Mild Brown Pull Up Leather Coat Wallet")) {
            setScaler('1.7')
        }
        if (name.match("Crocodile Leather Ladies Clutch in Antique Maroon Color")) {
            setScaler('1.7')
        }
        if (name.match("Plain Cow Leather Ladies Clutch")) {
            setScaler('1.65')
        }

        if (name.match("Mild Brown Pull Up Leather Coat Wallet")) {
            setScaler('1.9')
        }

        if (data.createdAt >= 1680084588) {
            setScaler('1')
        }



    }, [])




    const [imgLoader, setImgLoader] = useState(false)


    const color = "#212427"

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        loop: true,

        created() {
            setLoaded(assets.length < 2 ? false : true)
        },

        selector: ".second > .keen-slider__slide",
    }, [ResizePlugin, MutationPlugin])


    // formatted_with_symbol
    return (

        <div
            data-aos={window.innerWidth > 750 && `fade-right`}
            data-aos-delay={window.innerWidth > 750 && "10"}
            data-gird-slide
            data-aos-duration={window.innerWidth > 750 && "800"}
            data-aos-easing={window.innerWidth > 740 && "ease-out-quart"}

            className={window.innerWidth > 750 ? 'col-lg-3 col-md-4 col-6 my-2 px-2' : 'px-4'} style={{ cursor: 'pointer' }}>
            {/* <Link state={{ textDecoration: "none" }} to={`product/${id}`}></Link> */}
            <div className='h-100' style={{ textDecoration: "none" }} to={`/product/${_id}`}> <div className="card h-100 border-0 shadow-0" style={{ backgroundColor: "#ffffff" }}>
                {sku && <div class="ribbon ribbon-top-left"><span>{sku}% OFF</span></div>}
                <div style={{ overflow: 'hidden' }}>
                    {/* style={{ transform: 'scale(1.3)', overflow: 'hidden', height: '309px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} */}
                    <div className='position-relative' >

                        {!imgLoader && <div className='d-flex justify-content-center align-items-center w-100 h-100' style={{ position: 'absolute', zIndex: 99999999 }}>
                            <MoonLoader color="#F4B92D" />
                        </div>}
                        {/* <img onLoad={()=>setImgLoader(true)}  style={{ transform: `scale(${scaler})` }} src={e.url} className={`card-img-top assets[0] ${imgLoader&&'assets[0]-loaded'}`} alt="..." /> */}




                        {window.innerWidth>750?<>
                            <div className="navigation-wrapper">
                                <div ref={sliderRef} className="keen-slider second">
                                    {assets.map((e, i) => {
                                        return <div className="keen-slider__slide">
                                            <div key={e.url} onLoad={() => setImgLoader(true)} style={{ transform: i == 0 && `scale(${scaler})`, paddingBottom: '100%' }} className={`card-img-top position-relative w-100 h-100 ${imgLoader && 'image-loaded'}`}>
                                                <Link to={`/product/${_id}`}>
                                                    <Image cloudName="dextrzp2q" className="card-img-top position-absolute w-100 h-100" style={{ top: 0 }} key={e.url} publicId={e.url} type="fetch">
                                                  
                                                        <Transformation fetchFormat="webp" />
                                                        <Transformation quality="60" />
                                                        <Transformation crop="pad" height="1000" width="1000" background="#f1f1f1" />

                                                    </Image>
                                                </Link>
                                            </div>

                                        </div>
                                    })}
                                </div>
                                {/* {loaded && instanceRef.current && (
                                    <>
                                        <Arrow
                                            left
                                            onClick={(e) =>
                                                e.stopPropagation() || instanceRef.current?.prev()
                                            }

                                            disabled={currentSlide === 0}
                                        />

                                        <Arrow
                                            onClick={(e) =>
                                                e.stopPropagation() || instanceRef.current?.next()
                                            }
                                            disabled={
                                                currentSlide ===
                                                instanceRef.current.track.details.slides.length - 1
                                            }
                                        />
                                    </>
                                )} */}
                            </div>
                            {loaded && instanceRef.current && (
                                <div className="dots">
                                    {[
                                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                                    ].map((idx) => {
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    instanceRef.current?.moveToIdx(idx)
                                                }}
                                                className={"dot" + (currentSlide === idx ? " active" : "")}
                                            ></button>
                                        )
                                    })}
                                </div>
                            )}


                        </>:
                        <div onLoad={() => setImgLoader(true)} style={{ transform: `scale(${scaler})`, paddingBottom: '100%' }} className={`card-img-top position-relative w-100 h-100 ${imgLoader && 'image-loaded'}`}>
                            <Link to={`/product/${_id}`}>
                                <Image cloudName="dextrzp2q" className="card-img-top position-absolute w-100 h-100" style={{ top: 0 }} publicId={assets[0].url} type="fetch">

                                    <Transformation fetchFormat="webp" />
                                    <Transformation quality="60" />
                                    <Transformation crop="pad" height="1000" width="1000" background="#f1f1f1" />

                                </Image>
                            </Link>
                        </div>}
                    </div>
                </div>
                <Link to={`/product/${_id}`}>

                    <div className="card-body text-center">
                        <p style={{ color: color, fontSize: '17.6px', margin: '0px 0px 4px' }} className="card-title">{name.slice(0,42)+ `${name.length>42?"...":""}`}</p>
                        {sku ? <div className="d-flex justify-content-center">
                            <strike style={{ color: color, fontWeight: 'bolder' }}><p style={{ color: '#ad7d0b', fontSize: '15.84px' }} className="card-text mx-2">{"Rs" + quantity.toLocaleString('en-US') + '.00'}</p></strike>
                            <p style={{ color: color, fontSize: '15.84px', fontWeight: 'bold' }} className="card-text">{data.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</p>
                        </div> : <p style={{ color: color, fontSize: '15.84px' }} className="card-text">{
                        
                        //     country=="Saudi-Arabia"?
                        //     data.priceAED.toLocaleString('en-US', {
                        //     style: 'currency',
                        //     currency: 'AED',
                        // })
                        // :
                        data.localePrice
                    
                    }</p>}
                    </div>
                </Link>
            </div>
            </div>
        </div>
    )
}



function Arrow(props) {
    const disabeld = props.disabled ? " arrow--disabled" : ""

    return (
        <svg
            onClick={props.onClick}
            className={` arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}