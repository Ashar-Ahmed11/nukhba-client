import React from 'react'
import { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/notes/noteContext'
import WalletItem from './productItem copy'
import Spinner from './spinner'
import Placeholder from './placeholder'

export default function WalletList({slug}) {
    const context = useContext(NoteContext)
    const {theProductLoader, fetchProduct, products, fetchCart, loader, productLoader, sliderRef,postsPerPage,firstItemIndex,lastItemIndex } = context
    useEffect(() => {
        if(products.length<1){

            fetchProduct()
        }

        
    }, [])


    const [first, setfirst] = useState("second")
    useEffect(() => {
        setfirst("third")
    }, [])


    const newSlug = slug
    // console.log(slug)

    const wallet = products.filter((e) => { return e.category == newSlug })
    const reversed = [...wallet].reverse();
    // console.log(products)
    // console.log(wallet)

    
        console.log(reversed)
    const color = "#F4B92D"
    return (
    <div className='my-5'>
        
            <div className={window.innerWidth > 750 && "m-3"}>

                <div className="container-fluid">
                    {productLoader && <div style={{ position: "fixed", bottom: "-30px", right: "-25px", zIndex: "99999" }}><Spinner /></div>}
                    <div className="row">
                        {reversed.map((e) => {
                            return <WalletItem data={e} />
                        })}

                        
                    {theProductLoader && <>
                        <div className="col-md-4 col-6 ">
                            <Placeholder />
                        </div>
                        <div className="col-md-4 col-6 ">
                            <Placeholder />
                        </div>
                        <div className="col-md-4 col-6 ">
                            <Placeholder />
                        </div>
                        <div className="col-md-4 col-6 ">
                            <Placeholder />
                        </div>
                        <div className="col-md-4 col-6">
                            <Placeholder />
                        </div>
                        <div className="col-md-4 col-6">
                            <Placeholder />
                        </div>
                    </>}

                    



                    </div>
                    

                </div>


            </div>
        </div>
    )
}