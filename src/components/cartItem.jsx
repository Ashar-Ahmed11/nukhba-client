import React from 'react'
import { Image } from 'cloudinary-react'
import { Transformation } from 'cloudinary-react'
import { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
export default function CartItem({ data }) {
    const context = useContext(NoteContext)
    const { updateProduct, showAnimation,removeProduct } = context
    // formatted_with_symbol
    const { image, name, quantity, price, id,animation,localePrice } = data
    const color = "#212427"
    return (
        <div>
            <div className={`card mb-3`} style={{ backgroundColor: "#ffffff", maxWidth: "540px", borderColor: color}}>
                <div className="container">
                    <div className="row">
                        <div style={{display:"flex",justifyContent:'center',alignItems:'center'}} className="col-4">
                            {/* <img src={image.url} className="img-fluid  mx-3 my-5" alt="..." /> */}



                            <Image cloudName="dextrzp2q" className="img-fluid" key={image} publicId={image} type="fetch">

                                <Transformation fetchFormat="webp" />
                                <Transformation crop="pad" height="500" width="500" background="white" />
                                <Transformation quality="60" />
                            </Image>
                        </div>
                        <div className="col-8">
                            <div className="px-2">
                                <h5 style={{ color: color }} className="card-title my-3">{name}</h5>
                                <div className="d-flex">
                                    <button h5 style={{ borderColor: color, color: color }} onClick={() => updateProduct(data, quantity - 1)} className="btn">-</button>
                                    <p h5 style={{ color: color }} className="card-text mx-2">{quantity}</p>
                                    <button h5 style={{ borderColor: color, color: color }} onClick={() => updateProduct(data, quantity + 1)} className="btn">+</button>
                                </div>
                                <p style={{ color: color }} className="card-text py-2">{localePrice}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <h5 onClick={() => removeProduct(data)} style={{ position: 'absolute', right: '3px', top: '2px', cursor: 'pointer', color: color }}><i class="fa fa-times-circle" aria-hidden="true"></i>
</h5>
            </div>
        </div>
    )
}