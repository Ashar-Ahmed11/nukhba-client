import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Image, Transformation } from 'cloudinary-react'
export default function Carousal() {
  const context = useContext(NoteContext)
  const { anotherImageLoader, mainLoader, categoriesRef, setImgIsLoaded, setMainLoader, homeData, setCarousalEditor, adminView, editComponent, setText, setImageEditor, setComponent } = context
  const { mainCarousalImgDesktop, mainCarousalImgPhone } = homeData
  const [imgLoad, setImgLoad] = useState(false)
  const [showVideo, setshowVideo] = useState(false)

  const stopAllYouTubeVideos = () => {
    var iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo'
      }), '*');
    });
  }

  useEffect(() => {
    setMainLoader(true)
   
}, [])

  const [hidePlaceholder, sethidePlaceholder] = useState(false)

  return (
    <div>
      <div id="carouselExampleCaptions" class="carousel slide">

        <div onClick={(e) => { if (adminView) { setText(e.target.innerText); editComponent(); setCarousalEditor(true); setImageEditor(true); setComponent('mainCarousalImgDesktop') } }} class="carousel-inner">
          <div class="carousel-item active">
            <div style={{ zIndex: '20' }} className='shade'></div>



            <div  style={{ backgroundColor: "#000000", position: 'absolute', transition: '1s ease', opacity: hidePlaceholder ? '0' : '1',paddingBottom:window.innerWidth>750?"52.941%":"133.3%",zIndex:10 }} key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} onLoad={() => { setImgLoad(true) }} class="d-block w-100" >
              <Image cloudName="dextrzp2q"  style={{top:0}}  className={`card-img-top`} key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} publicId={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} type="fetch">

                <Transformation effect="blur:1000" fetchFormat="webp" />
                <Transformation quality="60" />

              </Image>

             
            </div>
            <div  style={{backgroundColor:"#000000",paddingBottom:window.innerWidth>750?"52.941%":"133.3%"}} key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} onLoad={() => { sethidePlaceholder(true) }} class="d-block w-100 h-100 position-relative" >
              <Image cloudName="dextrzp2q" style={{top:0}} className={`card-img-top position-absolute`} key={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} publicId={window.innerWidth > 750 ? mainCarousalImgDesktop : mainCarousalImgPhone} type="fetch">

                <Transformation fetchFormat="webp" />
                <Transformation quality="60" />

              </Image>

              
            </div>




            <div style={{ zIndex: '30' }} data-aos="fade-up" data-aos-duration="2000" className="mycarousel-caption">

              <p style={{ fontFamily: 'Sagrantino', fontSize: "35.2px" }}>The New Obsession</p>
              <p style={{ fontSize: "17.6px", marginBottom: '0px' }}>Shop with us and make the most of your budget!</p>

              {window.innerWidth > 992 ? <Link to="/categories/6433332d10b9054a792b64ef">      <button className="btn" style={{ padding: '9px 16px', borderRadius: "100px", color: 'white', width: 'max-content', borderColor: 'white', fontSize: '13.2px' }}> <p style={{ marginBottom: '0px' }}> VIEW CRAFTS</p></button></Link>
                : <button onClick={() => categoriesRef.current.click()} className="btn" style={{ padding: '9px 16px', borderRadius: "100px", color: 'white', width: 'max-content', borderColor: 'white', fontSize: '13.2px' }}> <p style={{ marginBottom: '0px' }}> VIEW CATEGORIES</p></button>}
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}