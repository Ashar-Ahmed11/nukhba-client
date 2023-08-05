import React from 'react'
import { useContext } from 'react'
import NoteContext from '../../context/notes/noteContext'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const history = useNavigate()
    const context = useContext(NoteContext)
    const { setImgIsLoaded, setMainLoader, setcheckouter } = context
    setImgIsLoaded(true)
    setMainLoader(false)
    setcheckouter(true)
    
    const token = localStorage.getItem('auth-token')
    if (!token) {
        history('/admin')
    }

    return (
        <div className='my-5'>
            <div className="container-fluid">
                <h1 className="text-center display-1 my-5" style={{ color: "#F4B92D" }}>Nukhba Dashboard</h1>
                <div className="row">
                    <div className="col-md-6 col-12 p-2">
                        <Link to={'/adminproducts'}> <div style={{ backgroundColor: '#302d2d' }} className="card themeColor">
                            <div className="card-body text-center ">
                                <h1 className='py-5 display-2'><i class="fas fa-box-open fa-2xl"></i></h1>
                                <h1 className="display-4">Products</h1>
                            </div>
                        </div>
                        </Link> 
                    </div>
                    <div className="col-md-6 col-12 p-2">
                        <div style={{ backgroundColor: '#302d2d' }} className="card themeColor">
                            <div className="card-body text-center ">
                                <h1 className='py-5 display-2'><i class="fa-solid fa-folder-tree fa-2xl"></i></h1>
                                <h1 className="display-4">Categories</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard