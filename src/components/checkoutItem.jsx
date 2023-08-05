import React from 'react'
import { Image } from 'cloudinary-react'
import { Transformation } from 'cloudinary-react'
export default function CheckoutItem({element}) {
    const {name,price,image,quantity} = element
    return(
        
              <div style={{ borderBottom: '1px solid #F4B92D', paddingBottom: '10px' }} className='d-flex justify-content-between my-2'>
                                <div className='d-flex'>
                                    <div style={{marginTop:'10%'}} className="position-relative">
                                        {/* <img className='card-img' style={{ borderRadius: "10px",width:'128px' }} src={image} alt="" /> */}
                                        
                                        
                            <Image cloudName="dextrzp2q" className='card-img' style={{ borderRadius: "10px",width:'128px' }} key={image} publicId={image} type="fetch">

<Transformation fetchFormat="webp" />
<Transformation crop="pad" height="500" width="500" background="black" />
<Transformation quality="60" />
</Image>
                                        <span style={{ backgroundColor: '#000000', width: '30px', height: '30px', border: '1px solid #F4B92D', color: '#F4B92D' }} class="position-absolute top-0 start-100 translate-middle rounded-circle">
                                            <p style={{ paddingTop: '2px' }} className='text-center'>{quantity}</p>
                                            <span class="visually-hidden">New alerts</span>
                                        </span>
                                    </div>
                                    <div style={{ color: '#F4B92D' }} className='py-5 mx-2'>{name}</div>

                                </div>

                                <div className='py-5' style={{ color: '#F4B92D' }}>{price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'PKR',
                    })}</div>
                            </div>
    
    )
}