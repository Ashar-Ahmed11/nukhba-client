import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import { useState } from 'react'
import Spinner from './spinner'
import ReactPlayer from 'react-player'
import { useEffect } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useParams } from 'react-router-dom'
import { Image, Transformation } from 'cloudinary-react'
import MetaDecorator from './metaDecorator'
import BarLoader from 'react-spinners/BarLoader'
import ThumbnailPlugin from './thumbnailPlugin'
import { fetchProduct } from './products'
export default function ProductView() {



  const ResizePlugin = (slider) => {
    const observer = new ResizeObserver(function () {
      slider.update()
    })

    slider.on("created", () => {
      observer.observe(slider.container)
    })
    slider.on("destroyed", () => {
      observer.unobserve(slider.container)
    })
  }

  const MutationPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        slider.update()
      })
    })
    const config = { childList: true }

    slider.on("created", () => {
      observer.observe(slider.container, config)
    })
    slider.on("destroyed", () => {
      observer.disconnect()
    })
  }


  const { productid } = useParams()
  
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,

    },
    [ResizePlugin]
    )
  const [thumbnailRef] = useKeenSlider(
    
    {
      initial: 0,
      slides: {
        origin: "center",
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef), ResizePlugin, MutationPlugin]
    )
    

    
    const context = useContext(NoteContext)

    const {fetchProduct,setImgIsLoaded, products, setProductView, productView, addProduct, productLoader, getProduct, setMainLoader, setnavLoader } = context
  // console.log(productView)
  // const { name, price, image, id, assets, description, youtubeLink } = productView
  
  useEffect(() => {
    if(products.length<1){
      fetchProduct()
    }
  }, [products])
  
  useEffect(() => {
    if(products.length>1){

      setProductView(products.find((e)=>{return e._id==productid}))
    }
  }, [products])
  
  // console.log(products)
  
  
  const [quantity, setQuantity] = useState(1)
  if (quantity < 1) {
    setQuantity(1)
  }

  const color = "#212427"

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  if (productView) {
    setMainLoader(false)
    setnavLoader(true)
    setImgIsLoaded(true)
  }

  useEffect(() => {
    return () => {
      setProductView(null)
    }
  }, [])




  // console.log(productView)
  const [imgLoaded, setimgLoaded] = useState(false)
  // console.log(youtubeLink)
  return (
    <>

      {productView && <div key={productView.image} >
      <MetaDecorator title={productView.name} description={productView.description.replaceAll('<p>', '').replaceAll('</p>', '')} imageUrl={productView.assets[0].url} imageAlt={productView.name}/>

        <div className='d-flex justify-content-center mb-5' >
          {productLoader && <div style={{ position: "fixed", bottom: "-30px", right: "-25px", zIndex: "99999" }}><Spinner /></div>}
          <div className="card mb-3 w-100 border-0 shadow-0 container" style={{ backgroundColor: "#ffffff" }} >
            <div className="row g-0">
              <div className="col-md-6">
                <div className="">
                  {/* <div style={{ overflow: 'hidden' }}>
                  <img key={element.url} style={{ width: "100%", transform: 'scale(1.9)' }} src={image.url} className="img-fluid rounded-start" alt="..." />
                </div> */}
                  <>
                    {<div>
                      <div ref={sliderRef} className="keen-slider" style={{ display: "flex", alignItems: 'center' }}>
                        {productView.assets.map((element) => {
                          return <div className='keen-slider__slide number-slide'>
                            <div className='d-flex justify-content-center' style={{ position: 'absolute', zIndex: 99999999, opacity: imgLoaded && '0', alignItems: "center", width: "100%", height: "100%" }}>
                              <BarLoader color="#F4B92D" />
                            </div>
                            {/* <img onLoad={() => setimgLoaded(true)} key={element.url} style={{ width: "100%", transform: "scale(1.2)" }} src={element.url} alt="" /> */}

                            <div className='position-relative' key={element.url} onLoad={() => setimgLoaded(true)} style={{ width: "100%",height:'100%',backgroundColor:"#ffffff",paddingBottom:"100%" }}>
                              <Image style={{top:'0'}} cloudName="dextrzp2q" className="card-img-top position-absolute w-100 h-100" key={element.url} publicId={element.url} type="fetch">

                                <Transformation fetchFormat="webp" />
                                <Transformation crop="pad" height="1000" width="1000" background="white" />
                                <Transformation quality="60" />
                              </Image>
                            </div>
                          </div>
                        })}
                      </div>

                      <div ref={thumbnailRef} className="keen-slider thumbnail " >
                        {productView.assets.length > 1 && productView.assets.map((element) => {
                          return <div className='keen-slider__slide number-slide ' style={{ display: "flex", alignItems: 'center' }}>
                            <div className='d-flex justify-content-center' style={{ position: 'absolute', zIndex: 99999999, opacity: imgLoaded && '0', alignItems: "center", width: "100%", height: "100%" }}>
                              <BarLoader color="#F4B92D" />
                            </div>
                            {/* <img key={element.url} style={{ width: "100%" }} src={element.url} alt="" /> */}
                            <div style={{ width: "100%" }}>
                              <Image cloudName="dextrzp2q" className="card-img-top" key={element.url} publicId={element.url} type="fetch">
                                <Transformation crop="pad" height="1000" width="1000" background="white" />
                                <Transformation fetchFormat="webp" />
                                <Transformation quality="60" />
                              </Image>
                            </div>
                          </div>
                        })}
                      </div>
                    </div>}
                  </>


                  {productView.youtubeLink && <div style={{ overflow: "hidden", pointerEvents: 'none' }} className="my-3">

                    <div style={{ width: "100%" }}>
                      <ReactPlayer

                        width="100%"
                        loop="true"
                        playing={true}
                        config={{
                          youtube: {
                            playerVars: {
                              autoplay: 1,
                              mute: 1,
                              controls: 0,
                              disablekb: 1,
                              loop: 1,
                              rel: 0,
                              showInfo: 0,
                            }
                          }
                        }}
                        url={productView.youtubeLink}
                        controls={false}
                        muted={true}
                      />
                    </div>


                  </div>}





                </div>
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <p style={{ color: color, fontFamily: 'Sagrantino', fontSize: '30px' }} className="card-title p-3">{productView.name}</p>

                  <p style={{ color: color, fontSize: '23px' }} className='p-3'>{productView.localePrice}</p>

                  <div className="d-flex p-3 justify-content-between px-3 mx-2">

                    <div className='my-2'><p style={{ color: color }}>Quantity</p></div>
                    <div className='d-flex'>

                      <i onClick={() => setQuantity(quantity - 1)} style={{ fontSize: "25px", color: color }} class="fa fa-minus-square-o my-2" aria-hidden="true"></i>
                      <p className='mx-2' style={{ fontSize: "25px", color: color }}>{quantity}</p>
                      <i onClick={() => setQuantity(quantity + 1)} style={{ fontSize: "25px", color: color }} class="fa fa-plus-square-o my-2" aria-hidden="true"></i>
                    </div>

                  </div>

                  <div className="p-3 d-flex">
                    <button style={{ backgroundColor: "#f4b92d", color: "#ffffff", width: "100%", borderRadius: "10px" }} onClick={() => addProduct(productView, quantity)} className="btn">Add to cart</button>
                  </div>
                  <div className='p-3'>
                    <p style={{ fontSize: "16.5px", color: "#B18314", textDecoration: "underline" }}>Description</p>

                    <div style={{ color: color, fontSize: "17.6px" }} dangerouslySetInnerHTML={{ __html: productView.description }}></div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}