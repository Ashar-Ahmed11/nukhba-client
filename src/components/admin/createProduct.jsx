import React from 'react'
import { useRef } from 'react'
import ImageAdjuster from './imageAdjuster'
import NoteContext from '../../context/notes/noteContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import JoditEditor, { Jodit } from 'jodit-react';
import { useParams } from 'react-router-dom'
import Spinner from '../spinner'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function CreateProduct() {

    const params = useParams()
    const { prodid } = params
    const openModal = useRef(null)
    const history = useNavigate(null)
    const context = useContext(NoteContext)
    const { deleteProduct, editProduct, setProductView, getProduct, productView, categories, asset, createProduct, setModalIsOpen, modalRef, setMyAsset, setImgPreview, imgPreview, setImgIsLoaded, setMainLoader, setcheckouter } = context

    useEffect(() => {
        setImgPreview([])
    }, [])
    console.log(categories)



    const [components, setComponents] = useState({ namer: "", price: "", description: "", category: "", homePreview: false, youtubeLink: '' })
    console.log(components.category)
    const dispatchProduct = (e) => {
        e.preventDefault()
        prodid ? editProduct(prodid, components.namer, components.price, components.description, components.category, components.homePreview, components.youtubeLink)
            : createProduct(components.namer, components.price, components.description, components.category, components.homePreview, components.youtubeLink)
    }
    const color = "#F4B92D"
    const token = localStorage.getItem('auth-token')
    if (!token) {
        history('/admin')
    }

    setImgIsLoaded(true)
    setMainLoader(false)
    setcheckouter(true)
    console.log(imgPreview)

    const [firstdndElement, setfirstdndElement] = useState({ element: null, index: null })
    const [seconddndElement, setseconddndElement] = useState({ element: null, index: null })

    const changeOrder = () => {
        // imgPreview.splice(firstdndElement.index,0,seconddndElement.element.url)
        // imgPreview.splice(seconddndElement.index,1,firstdndElement.element.url)

        imgPreview.splice(firstdndElement.index, 1, seconddndElement.element)
        imgPreview.splice(seconddndElement.index, 1, firstdndElement.element)

        setImgPreview([...imgPreview])
    }

    console.log(firstdndElement)
    console.log(seconddndElement)

    // function arraymove(arr, fromIndex, toIndex) {

    //  ;
    // }
    useEffect(() => {
        if (prodid) {

            getProduct(prodid)

        }
    }, [])

    useEffect(() => {

        if (productView) {
            const { name, price, description, youtubeLink, homePreview, category } = productView
            setComponents({ namer: name, price: price, description: description, youtubeLink: youtubeLink, homePreview: homePreview, category: category })
            setImgPreview(productView.assets)
        }
        return () => {
            setProductView(null)

        }
    }, [productView])

    // console.log(components.category)

    const [editImageUrl, setEditImageUrl] = useState(null)

    const deleteModalRef = useRef(null)

    const removeImage=(element)=>{
        const filteredImages = imgPreview.filter((e)=>{return e._id!==element._id})
        setImgPreview(filteredImages)

    }


    return (
        <div>
            <div >
                <div className="d-flex justify-content-center  py-3">
                    <h1 style={{ fontFamily: "Sagrantino", color: color }}>{prodid ? "Edit Product" : "Create Product"}</h1>
                </div>
                <div className="container">
                    <form>

                        <input value={components.namer} onChange={(e) => setComponents({ ...components, namer: e.target.value })} style={{ color: color, backgroundColor: '#000000', borderColor: color }} type="text" placeholder='Product Name' className="form-control my-2" />
                        <input value={components.price} onChange={(e) => setComponents({ ...components, price: e.target.value })} style={{ color: color, backgroundColor: '#000000', borderColor: color }} type="text" placeholder='Product Price' className="form-control my-2" />
                        <div>
                            <button onClick={(e) => { e.preventDefault(); openModal.current.click(); setEditImageUrl(null) }} style={{ borderColor: color, color: color }} className="btn">Upload Image</button>
                            <>
                                {/* <button onClick={(e) => { e.preventDefault(); openModal.current.click() }} style={{ borderColor: color, color: color }} className="btn mx-2">Reupload Image</button> */}
                                <button onClick={(e) => { e.preventDefault(); setImgPreview([]) }} style={{ borderColor: color, color: color }} className="btn mx-2">Remove Images</button>
                            </>

                            {imgPreview && <div className="my-2">
                                <div className="row">
                                    {imgPreview.map((e, i) => {

                                        // return <div
                                        //     draggable

                                        //     onDragStart={() => { setfirstdndElement({ element: e, index: i }); console.log(i) }}
                                        //     onDragEnter={() => { setseconddndElement({ element: e, index: i }); console.log(i) }}
                                        //     onDragEnd={() => changeOrder()}
                                        //     className="col-lg-3 col-md-4 col-6 my-2">
                                        //     <div className="card">
                                        //         <div className="card-img">
                                        //             <img height="309px" src={e.url} alt="" />
                                        //         </div>

                                        return <div
                                            draggable
                                            onDragStart={() => { setfirstdndElement({ element: e, index: i }); console.log(i) }}
                                            onDragEnter={() => { setseconddndElement({ element: e, index: i }); console.log(i) }}
                                            onDragEnd={() => changeOrder()}
                                            
                                            className="col-md-4 col-lg-3 col-6 p-1"><div class="card" style={{}}>
                                                <img onClick={() => { openModal.current.click(); setEditImageUrl({ url: 'https://res.cloudinary.com/dextrzp2q/image/fetch/f_webp/q_60/b_black,c_pad,h_1000,w_1000/' + e.url, _id: e._id }); console.log(e) }} src={'https://res.cloudinary.com/dextrzp2q/image/fetch/f_webp/q_60/b_black,c_pad,h_1000,w_1000/' + e.url} class="card-img-top" alt="..." />
                                                <span style={{ backgroundColor: '#000000', width: '30px', height: '30px', border: '1px solid #F4B92D', color: '#F4B92D' }} class="position-absolute top-0 start-100 translate-middle rounded-circle">
                                            <p onClick={()=>removeImage(e)} style={{ paddingTop: '2px',cursor:'pointer' }} className='text-center'><i class="fas fa-times fa-lg"></i></p>
                                            <span class="visually-hidden">New alerts</span>
                                        </span>
                                            </div>
                                            
                                        </div>


                                    })}

                                </div>
                            </div>}

                            <select onChange={(e) => setComponents({ ...components, category: e.target.value })} class="form-select my-3" aria-label="Default select example">
                                <option selected>{components.category == '' ? 'Select Category' : components.category}  {!categories[0] && <Spinner />} </option>


                                {categories.map((e) => {
                                    return <option value={e.mainHeading.replace(" ","").toLowerCase()}>
                                        {e.mainHeading.toLowerCase()}
                                    </option>
                                })}

                            </select>


                        </div>


                        <div class="form-check form-switch">
                            <input checked={components.homePreview} onChange={(e) => setComponents({ ...components, homePreview: e.target.checked })} style={{ backgroundColor: '#F4B92D' }} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                            <label class="form-check-label" style={{ color: "#F4B92D" }} for="flexSwitchCheckDefault">Display On Home Page</label>
                        </div>
                        <input value={components.youtubeLink} onChange={(e) => setComponents({ ...components, youtubeLink: e.target.value })} style={{ color: color, backgroundColor: '#000000', borderColor: color }} type="text" placeholder='Youtube Video URL' className="form-control my-2" />


                        <div className='my-2'>
                            <JoditEditor value={components.description} onBlur={(e) => { setComponents({ ...components, description: e }) }} />;
                        </div>

                        <div className={`d-flex ${prodid ? 'justify-content-between' : 'justify-content-end'}     align-items-center my-3`}>
                            {prodid && <button onClick={(e) => { e.preventDefault(), deleteModalRef.current.click() }} className="btn btn-danger">Delete</button>}
                            <button onClick={(e) => dispatchProduct(e)} style={{ borderColor: color, color: color }} className="btn my-2">{prodid ? 'Edit Product' : 'Create Product'}</button>
                        </div>
                    </form>


                </div>

            </div>








            <button ref={openModal} hidden={true} onClick={() => setModalIsOpen(true)} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalFOR">
                Launch demo modal
            </button>


            <div class="modal fade" id="exampleModalFOR" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ImageAdjuster imageUrl={editImageUrl} setEditImageUrl={setEditImageUrl} />
                        </div>
                        <div class="modal-footer">
                            <button ref={modalRef} onClick={() => setModalIsOpen(false)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                        </div>
                    </div>
                </div>
            </div>






            <button hidden={true} ref={deleteModalRef} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalDelete">
                Launch demo modal
            </button>


            <div class="modal fade " id="exampleModalDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Product Deletion Warning</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <p>Are you sure you want to completely delete this product?</p>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => deleteProduct(prodid)} data-bs-dismiss="modal" type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

