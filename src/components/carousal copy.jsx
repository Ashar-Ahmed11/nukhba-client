import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Image, Transformation } from 'cloudinary-react'
export default function WalletCarousal() {
    const { id } = useParams()
    const location = useLocation()
    const context = useContext(NoteContext)
    const { setImgIsLoaded, setCatyImageEditor, setMainLoader, getCategoryData, categoryData, setCatyEditor, setCategorial, editComponent, setComponent, setText, adminView, setCarousalEditor, setImageEditor } = context
    const { mainCarousalImgDesktop, mainCarousalImgPhone, mainHeading } = categoryData
    const [imgLoad, setImgLoad] = useState(false)
    const [hidePlaceholder, sethidePlaceholder] = useState(false)




    useEffect(() => {
      sethidePlaceholder(false)
    }, [location.pathname])
    

    useEffect(() => {
        setMainLoader(true)
       
    }, [])


    const catyEditDeclare = () => {
        if (adminView) {
            setCatyImageEditor(true)
            setCatyEditor(true)
            setCategorial(id)

            editComponent()
            setCarousalEditor(true);
            setImageEditor(true);
            setComponent('mainCarousalImgDesktop')

        }

    }

    return (
        <div
        key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone}
        
        >
            <div style={{ borderBottom: `1px solid #F4B92D` }} id="carouselExampleCaptions" class="carousel slide">

                <div onClick={() => { catyEditDeclare() }} class="carousel-inner">
                    <div class="carousel-item active">
                        <div style={{zIndex:20}} className='shade'></div>
                      
                        
            <div 
            
            key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone}
            style={{ backgroundColor: "#000000", position: 'absolute', transition: '1s ease', opacity: hidePlaceholder ? '0' : '1',paddingBottom:window.innerWidth>750?"52.941%":"133.3%",zIndex:10 }}  onLoad={() => { setImgLoad(true) }} class="d-block w-100" >
              <Image 
              
              cloudName="dextrzp2q"  style={{top:0}}  className={`card-img-top`}  publicId={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} type="fetch">

                <Transformation effect="blur:1000" fetchFormat="webp" />
                <Transformation quality="60" />

              </Image>

             
            </div>
            <div
            
            key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone}
            style={{backgroundColor:"#000000",paddingBottom:window.innerWidth>750?"52.941%":"133.3%"}}  onLoad={() => { sethidePlaceholder(true) }} class="d-block w-100 h-100 position-relative" >
              <Image
              
              cloudName="dextrzp2q" style={{top:0}} className={`card-img-top position-absolute`}  publicId={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} type="fetch">

                <Transformation fetchFormat="webp" />
                <Transformation quality="60" />

              </Image>

              
            </div>
{/* 
key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone}
key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone}
key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} */}

                        <div style={{zIndex:'30'}} className="mycarousel-caption">

                            <p data-aos="fade-up" data-aos-duration="1000" style={{ fontFamily: 'Sagrantino', fontSize: "52.8px" }}>{mainHeading}</p>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}