import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../../context/notes/noteContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const AdminProducts = () => {
  const history = useNavigate()
  const context = useContext(NoteContext)
  const { setEditorLoader, setImgIsLoaded, setMainLoader, setcheckouter, products, fetchProduct } = context
  setImgIsLoaded(true)
  setMainLoader(false)
  setcheckouter(true)
  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    if (products.length > 0) {

      setFilteredList(products)
    }
  }, [products])


  const [filteredList, setFilteredList] = useState([])

  const [searchQuery, setsearchQuery] = useState('')
  const filterBySearch = (event) => {
    // Access input value
    event.preventDefault()
    // Create copy of item list
    if (searchQuery == '') {
      setFilteredList(products)
    }
    else {
      var updatedList = [...products];
      // Include all elements which includes the search query
      updatedList = updatedList.filter((item) => {
        return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
      });
      // Trigger render with updated values
      setFilteredList(updatedList);
    }
  };

  const showHomeProducts = (e) => {
    if (e.target.checked) {
      const homeProducts = filteredList.filter((e) => { return e.homePreview == true })
      setFilteredList(homeProducts)
    }
    else {
      setFilteredList(products)
    }

  }

  const token = localStorage.getItem('auth-token')
  if (!token) {
    history('/admin')
  }




  const [sheetData, setsheetData] = useState([])
  const getSheetProducts = async () => {

    const url = "https://sheetdb.io/api/v1/diq89qn0z7ido"

    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      // body data type must match "Content-Type" header
    }
    );

    const result = await response.json()
    // setsheetData(result)
    

      // Use filter to get elements from arr1 that have unique property values
      const uniqueElements = products.filter(obj1 =>
        !result.some(obj2 => obj2['id'] === obj1['_id'])
      )
    
      return uniqueElements;
    
    




    // console.log(sheetData)
  }




  function getUniqueElementsByProperty(arr1, arr2) {
    const uniqueElements = [];

    arr1.forEach(obj1 => {
      // Check if there is no element in arr2 with the same property value
      const isUnique = !arr2.some(obj2 => obj1['_id'] === obj2['id']);

      if (isUnique) {
        uniqueElements.push(obj1);
      }
    });

    return uniqueElements;
  }

  // console.log(products)


  const addToMeta = async (e) => {
    e.preventDefault()
    setEditorLoader(true)

    setEditorLoader(false)
  }

  const setToMeta = async () => {

    setEditorLoader(true)
    const prods = await getSheetProducts()
  
  
    // const apnidescription = components.description.replaceAll('<p>', '').replaceAll('</p>', '')


    const url = "https://sheetdb.io/api/v1/diq89qn0z7ido"

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        data:
          //  [
          //     {
          //         id: components._id,
          //         title: components.namer,
          //         price: components.price,
          //         description: apnidescription,
          //         condition: "new",
          //         availability: "in stock",
          //         brand: "Nukhba",
          //         link: `https://nukhba.shop/product/${components._id}`,
          //         image_link: imgPreview[0].url


          //     }
          // ],
          prods.map((e) => {
            return {
              id: e._id,
              title: e.name,
              price: e.price,
              description: e.description.replaceAll('<p>', '').replaceAll('</p>', ''),
              condition: "new",
              availability: "in stock",
              brand: "Nukhba",
              link: `https://nukhba.shop/product/${e._id}`,
              image_link: e.assets[0].url,
              additional_image_link:e.assets.slice(1).map((e)=>{return " " + e.url + " " }).toString()
            }
          })


      })

      // body data type must match "Content-Type" header
    }
    );

    const data = await response.json()
    console.log(data)
    setEditorLoader(false)
  }


  return (
    <div className="my-2">
      <div className="container-fluid ">
        <h1 className=" display-1 text-center">Products</h1>
        <div className=" py-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <form onSubmit={(e) => filterBySearch(e)}>
              <div className="d-flex align-items-center">
                <input value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} style={{ borderColor: "black", color: 'black', backgroundColor: "#ffffff" }} type="text" className="form-control" />
                <div class="px-2">
                  <button style={{ cursor: 'pointer', border: 'none', backgroundColor: "#fafafa" }} className='fas fa-search fa-lg'></button>
                </div>
                <button onClick={() => setToMeta()} className="btn btn-primary">Sync Meta</button>


              </div>



            </form>
            <div>
              <Link to='/createproduct'> <button style={{ borderColor: "#F4B92D", color: '#F4B92D' }} className="btn rounded-circle"><i class="fas fa-plus "></i></button></Link>
            </div>
          </div>
          <div className='mb-3' style={{ color: "#F4B92D" }}>
            <div className="d-flex align-items-center">
              <div class="form-check form-switch">
                <input onChange={(e) => showHomeProducts(e)} style={{ backgroundColor: "#F4B92D" }} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
              <span>Show Home Products</span>
            </div>
          </div>
          <div style={{ overflowX: 'scroll' }}>
            <table className='text-center w-100' >
              <thead style={{ borderBottom: '2px solid #F4B92D' }}>
                <th className='pb-3 h2' >ID</th>

                <th className='pb-3 h2' style={{ width: '75%' }}>Product</th>

                <th className='pb-3 h2'>Category</th>
                <th className='pb-3 h2'>Price</th>
              </thead>
              <tbody >
                {filteredList.length < 1 ? <>
                  <tr>
                    <td colSpan={4}>
                      <div className="py-5">
                        <div style={{ width: '60px', height: '60px' }} class="spinner-border " role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </> : filteredList.map((e, i) => {
                  return <tr style={{ borderBottom: '1px solid #F4B92D' }}>

                    <td className='py-3 px-2 h3' >{i + 1}</td>

                    <td className='text-start py-3  ' style={{ width: '75%' }}>
                      <div className="d-flex align-items-center justify-content-between">

                        <img style={{ width: '15vw', height: '100%' }} src={`https://res.cloudinary.com/dextrzp2q/image/fetch/f_webp/q_60/b_white,c_pad,h_1000,w_1000/${e.assets[0].url}`} alt="" />

                        <span className='px-2 h3'>{e.name}</span>

                        {e.homePreview ? <h3 className="btn" style={{ color: "#FFFFFF", backgroundColor: '#F4B92D' }}>HOME</h3> : <div></div>}
                      </div>
                    </td>

                    <td className="py-3 px-2 h3">
                      {e.category}
                    </td>
                    <td className='py-3 h3 px-2'>{e.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'PKR',
                    })}</td>
                    <Link to={`/createproduct/${e._id}`}> <i class="fas fa-edit fa-2xl mt-5"></i>
                    </Link>

                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminProducts