import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';
import Navbar, { fetchNavCategory } from './components/navbar';
import Categories, { getCategoryContent } from './components/wallets copy 4';
import CreateProduct from './components/admin/createProduct';
import Home from './components/home';
import NoteState from './context/notes/noteState';
import ProductView from './components/productView';
import '../src/App.css'
import Footer from './components/footer';
import BigLoader from './components/bigloader';
import { useEffect } from 'react';
import Checkout from './components/checkout';
import ThankYou from './components/thankyou';
import Admin from './components/admin';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/scrolltotop';
import EditLoader from './components/editLoader'

import AdminEditor from './components/adminEditor';
import Cart from './components/cart';
import CreateCategory from './components/admin/createProduct copy';
import Dashboard from './components/admin/dashboard';
import AdminProducts from './components/admin/adminproducts';
import RegionChecker from './components/adminEditor copy';
import { useContext } from 'react';
import NoteContext from './context/notes/noteContext';
import MetaDecorator from './components/metaDecorator';
import { Link } from 'react-router-dom';
export default function App() {
    const context = useContext(NoteContext)
    const {setCart,products,setProducts,country,productsFetched} = context


    useEffect(() => {
        window.history.scrollRestoration = 'manual'
        
     
    }, []);
    document.body.style = 'overflow-x: hidden'
    // document.body.style = loader?'overflow:hidden;':'overflow:show;'
        const location = useLocation()





    // useEffect(() => {
    //     var prevScrollpos = window.scrollY;
    //     window.onscroll = ()=> {
    //       var currentScrollPos = window.scrollY;
    //       if (prevScrollpos > currentScrollPos) {
    //         document.getElementById("navbar").style.top = "0";
    //       } else {
    //         document.getElementById("navbar").style.top = -document.getElementById("navbar").clientHeight+'px';
    //       }
    //       prevScrollpos = currentScrollPos;
    //     }
    // }, [])


    useEffect(() => {
      if(productsFetched){
        let newProducts = products

        for (let index = 0; index < newProducts.length; index++) {
            const element = newProducts[index];
            if (country == "Saudi-Arabia") {
                element.pricePKR = element.price
                element.price = element.priceAED
                element.localePrice = element.priceAED.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'SAR',
                })

            
            }


            else {
                
                element.price = element.pricePKR?element.pricePKR:element.price
               
                element.localePrice = element.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PKR',
                })
                

            }
     
        }
        setProducts([...newProducts])
        setCart([])

    console.log('helloweo')
    console.log(newProducts)

    
}
}, [productsFetched,country])

    return (
        <div>




            <Cart/>
            <MetaDecorator 
            title="Nukhba - Handcrafted Leather Products in Pakistan | Wallets, Belts, Bags" 
            description="Nukhba is an innovative Premium Leather & Fashion Brand. We offer high quality leather wallets, bags, belts, and small luxury leather goods."
            imageUrl="https://res.cloudinary.com/dextrzp2q/image/fetch/f_webp/q_60/https://res.cloudinary.com/dextrzp2q/image/upload/v1699712687/og-image_hjeklo.png"
            imageAlt="Nukhba - Handcrafted Leather Products in Pakistan | Wallets, Belts, Bags"
            />
            <div style={{backgroundColor:"#ffffff"}}>
                <RegionChecker/>
                <ScrollToTop />
                <EditLoader />
                {/* https://web.whatsapp.com/send?phone=923083116347&text=Welcome%20to%20the%20store */}
                <BigLoader />
                <AdminEditor />
                <div style={{ transition: 'all 0.8s ease' }} id='navbar' className='sticky-top' hidden={location.pathname == '/checkout' && 'true' || location.pathname == '/thankyou' && 'true' || location.pathname == '/admin' && 'true'}>

                    <Navbar />
                </div>
                
                
                <div hidden={location.pathname == '/checkout' && 'true' || location.pathname == '/thankyou' && 'true' || location.pathname == '/admin' && 'true'}>
                    <div className='whatsapp'>
                        <a target="_blank" aria-label="Chat on WhatsApp" href="https://wa.me/923083116347?text=How%20can%20I%20place%20an%20order%3F"> <i style={{ color: '#0dc143' }} className="fa fa-whatsapp" aria-hidden="true"></i> </a>
                    </div>
                </div>
                <div>
                    <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categories/:id" element={<Categories />} />

                        <Route path="/product/:productid" element={<ProductView />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/thankyou" element={<ThankYou />} />
                        <Route path="/createproduct" element={<CreateProduct />} />
                        <Route path="/createproduct/:prodid" element={<CreateProduct />} />
                        <Route path="/adminproducts" element={<AdminProducts />} />
                        <Route path="/createcategory" element={<CreateCategory />} />

                        <Route path="/admin" element={<Admin />} />
                    </Routes>

                </div>
                <div hidden={location.pathname == '/admin' && 'true'}>
                    <Footer />
                </div>
            </div>




        </div >
    )
}