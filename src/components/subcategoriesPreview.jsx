import React from 'react'
import { useContext,useState } from 'react'
import { Image, Transformation } from 'cloudinary-react'
import NoteContext from '../context/notes/noteContext'
import { Link } from 'react-router-dom'
const SubCategoriesPreview = ({mainHeading}) => {
  const context = useContext(NoteContext)
  const { categories } = context
  console.log(categories)
  const excludeCategories = categories.filter((e)=>{return e.mainHeading!==mainHeading }).filter((e)=>{return e.mainHeading.includes(`*${mainHeading&&mainHeading.toLowerCase()}*`) })


  const [hidePlaceholder, sethidePlaceholder] = useState(false)
  const color = "#212427"
  console.log(categories)

  return (
    <>
    {excludeCategories.length!==0&&<div>
      <div className="container-fluid">
      <p data-aos="fade-up" data-aos-duration="1000" className="h1 text-center my-5" style={{ fontFamily: 'Sagrantino', color: color }}>{`${mainHeading} Collection`}</p>
        <div className="row">
          {excludeCategories.map((e,i)=>{
            return <Link to={`/categories/${e._id}`} className={`col col-${window.innerWidth<992?i==0?'12':'6':i>3?'4':'6'} p-1`}>
            <div id="carouselExampleCaptions" class="carousel slide">

              <div  class="carousel-inner rounded-4">
                <div class="carousel-item active">
                  <div style={{ zIndex: '20' }} className='shade'></div>



                  <div style={{ backgroundColor: "#000000", position: 'absolute', transition: '1s ease', opacity: hidePlaceholder ? '0' : '1', zIndex: 10 }} key={e.mainCarousalImgDesktop} class="d-block w-100" >
                    <Image cloudName="dextrzp2q" style={{ top: 0 }} className={`card-img-top`} key={e.mainCarousalImgDesktop} publicId={e.mainCarousalImgDesktop} type="fetch">

                      <Transformation effect="blur:1000" fetchFormat="webp" />
                      <Transformation quality="60" />

                    </Image>


                  </div>
                  <div style={{ backgroundColor: "#000000", paddingBottom:  "52.941%" }} key={e.mainCarousalImgDesktop} onLoad={() => { sethidePlaceholder(true) }} class="d-block w-100 h-100 position-relative" >
                    <Image cloudName="dextrzp2q" style={{ top: 0 }} className={`card-img-top position-absolute`} key={e.mainCarousalImgDesktop} publicId={e.mainCarousalImgDesktop} type="fetch">

                      <Transformation fetchFormat="webp" />
                      <Transformation quality="60" />

                    </Image>


                  </div>




                  <div className='h-100 w-100 text-center' style={{ zIndex: '30',position:"absolute",top:"0px",display:'flex',flexDirection:'column',justifyContent:'center'}} data-aos="fade-up" data-aos-duration="2000" >

                    <span style={{ fontFamily: 'Sagrantino',color:"white",fontSize:"180%",lineHeight:'1' }}>{e.firstHeading.replace(`*${mainHeading.toLowerCase()}*`,"")}</span>
                   
                    {/* <Link to={`/categories/${e._id}`}>      <button className="btn" style={{ padding: '9px 16px', borderRadius: "100px", color: 'white', width: 'max-content', borderColor: 'white', fontSize: '13.2px' }}> <p style={{ marginBottom: '0px' }}> VIEW CRAFTS</p></button></Link> */}
                      
                  </div>
                </div>


              </div>

            </div>

          </Link>
          })}
        </div>
      </div>
    </div>}
    </>
  )
}

export default SubCategoriesPreview