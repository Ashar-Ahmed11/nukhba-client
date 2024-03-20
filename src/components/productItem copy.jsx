import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from 'react-spinners/MoonLoader'
import { avif } from '@cloudinary/url-gen/qualifiers/format'
import { useLocation } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'
import { CloudinaryImage } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { Image, Transformation } from 'cloudinary-react'
import { format } from '@cloudinary/url-gen/actions/delivery'
import ScrollAnimation from 'react-animate-on-scroll';
import { useKeenSlider } from 'keen-slider/react'
import MutationPlugin from './Plugins/MutationObserver'
import ResizePlugin from './Plugins/ResizePlugin'
export default function WalletItem({ data }) {
    const location = useLocation()
    const context = useContext(NoteContext)
    const { addProduct, getProduct, refreshPage } = context
    const { name, assets, price, description, _id, sku } = data
    // console.log(parseInt(sku))
    const [scaler, setScaler] = useState("2.15")

    // const [transformedUrl, setTransformedUrl] = useState("")
    //    const getImage = ()=>{
    //     const er =  new CloudinaryImage(e.url).delivery(format(avif())).resize(scale().height(100))

    //     console.log(er)
    //     setTransformedUrl(er.publicID)
    // }

    // useEffect(() => {
    //   getImage()
    // }, [e.url])


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
        if (name.match("Handbag")) {
            setScaler("1.5")

        }
        if (name.match("Plain Cow Leather Ladies Clutch")) {
            setScaler('1.65')
        }
        if (name.match("Mild Brown Pull Up Leather Coat Wallet")) {
            setScaler('1.9')
        }
        if (name.match("Dark Brown Pull Up Leather Coat Wallet")) {
            setScaler('1.9')
        }
        if (name.match("Dark Blue Pull Up Leather Coat Wallet")) {
            setScaler('1.9')
        }
        if (name.match("Light Brown Pull Up Leather Coat Wallet")) {
            setScaler('1.9')
        }
        if (name.match("Grain Cow Leather Passport Cover")) {
            setScaler('1.9')
        }

        if (data.theTitle == "thezoomedpicture" || data.createdAt >= 1680084588) {
            setScaler("1")
        }

        else {
            setScaler('2.15')
        }



    }, [data])

    const [imgLoader, setImgLoader] = useState(false)

    const color = "#212427"
  

    useEffect(() => {
        setImgLoader(false)
        setHeight('300px')
        if (imgHeight == false || !imgHeight) {
            setHeight('max-content')
        }
    }, [assets[0].url])


    const [height, setHeight] = useState('max-content')
    const [checker, setChecker] = useState(null)
    const imgHeight = checker && imgLoader && '300'
    // console.log(imgHeight)
    // const [eSourceUrl, setImageSourceUrl] = useState("");

    // const downloadImageAndSetSource = async (eUrl) => {
    //     const e = await fetch(eUrl);
    //     const finalImage = await e.blob()

    //     setImageSourceUrl(finalImage)
    // }
    // useEffect(() => {
    //     // !imgHeight?'300px':'max-content'

    //    downloadImageAndSetSource(`https://res.cloudinary.com/demo/e/fetch/f_avif/${e.url}`)



    // },[e.url])


    // console.log(eSourceUrl)

    //



    // const relDiff=(etalon, example)=> {
    //     return  +Math.abs(100 - example / etalon * 100).toFixed(10);
    //   }
    //    // example
    //    console.log(relDiff(600, 300))

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
    }, [MutationPlugin, ResizePlugin])

    console.log()
    return (

        <div
            key={assets[0].url}
            data-aos={`fade-right`}
            data-aos-delay={"10"}
            data-gird-slide
            data-aos-duration={"800"}
            data-aos-easing={"ease-out-quart"}
            className={'px-1 col-md-4 col-lg-3 col-6 my-2'} style={{ cursor: 'pointer' }}>
            <div className="card border-0 shadow-0" data-label={sku && `${sku}% Off`} style={{ backgroundColor: "#ffffff" }}>
                {sku && <div class="ribbon ribbon-top-left"><span>{sku}% OFF</span></div>}
                <div style={{ overflow: 'hidden' }}>
                    {/* <div style={{ overflow: 'hidden', height: 'max-content', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: "1s ease", height: checker || imgLoader ? 'max-content' : '300px' }}> */}
                    <div className='position-relative'>
                        {!imgLoader && <div className='w-100 d-flex justify-content-center align-items-center h-100' style={{ position: 'absolute', zIndex: 99999999 }}>
                            <MoonLoader color="#F4B92D" />
                        </div>}


                        {/* <img type="" id='thatImage' key={e.url} loading="lazy" onLoad={(e) => { setImgLoader(true); setHeight('max-content'); e.target.alt = 'hello'; setChecker(e.target.alt) }} src={`https://res.cloudinary.com/dextrzp2q/e/fetch/f_avif/${transformedUrl}`} style={{ transform: `scale(${scaler})` }}  className={`card-img-top `} alt="..." /> */}





                        <div className="navigation-wrapper">
                            <div ref={sliderRef} className="keen-slider">
                                {assets.map((e) => {
                                    return <div className="keen-slider__slide">
                                        <div key={e.url} onLoad={(e) => { setImgLoader(true); setHeight('max-content'); e.target.alt = 'hello'; setChecker(e.target.alt); e.target.loading = 'lazy'; e.target.onLoad = setImgLoader(true) }} style={{ transform: `scale(${scaler})`, marginBottom: '100%' }} className={`card-img-top position-relative w-100 h-100`}>
                                            <Link to={`/product/${_id}`}>
                                                <Image cloudName="dextrzp2q" className="card-img-top position-absolute w-100 h-100" style={{ top: 0 }} key={e.url} publicId={e.url} type="fetch">

                                                    <Transformation aspectRatio="1:1" crop="pad" background="#f1f1f1" />

                                                    <Transformation fetchFormat="webp" />
                                                    <Transformation crop="pad" height="1000" width="1000" background="#f1f1f1" />
                                                    <Transformation quality="60" />
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



                    </div>
                </div>
                <Link to={`/product/${_id}`}>
                    <div className="card-body text-center">
                        <p style={{ color: color, fontSize: '17.6px', margin: '0px 0px 4px' }} className="card-title">{name.slice(0,42)+ `${name.length>42?"...":""}`}</p>
                        {sku ? <div className="d-flex justify-content-center">
                            <strike style={{ color: color, fontWeight: 'bolder' }}><p style={{ color: '#ad7d0b', fontSize: '15.84px' }} className="card-text mx-2">{"Rs" + data.inventory.available.toLocaleString('en-US') + '.00'}</p></strike>
                            <p style={{ color: color, fontSize: '15.84px', fontWeight: 'bold' }} className="card-text">{data.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'PKR',
                            })}</p>
                        </div> : <p style={{ color: color, fontSize: '15.84px' }} className="card-text">{data.localePrice}</p>}
                    </div>
                </Link>
            </div>
        </div>
    )
}



function Arrow(props) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
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