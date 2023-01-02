import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, getCountry, createAddress, deleteAddress } from "../redux/actions";

const UserProfile = () => {

  const { loggedUser,  countries  } = useSelector(state => state.user);

  const [userData, setUserData] = useState(
    {
    firstName:"",
    lastName:"",
    username:"",
    photo: "",
    phoneNumber:"",
  }
  )
  const [allAddresses, setAllAddresses] = useState(loggedUser?.addresses)
  const [selectedCountry , setSelectedCountry] = useState()
  const [userAddress, setUserAddress] = useState(
    {
    // userId
    country:"",
    city:"",
    state:"",
    zipCode:"",
    neighborhood:"",
    street:"",
    houseNumber:"",
  }
  )
  // const [userPreference, setUserPreference] = useState(
  //   {
  //   newProducts:loggedUser?.preference?.newProducts ? loggedUser.preference.newProducts: false,
  //   offers:loggedUser?.preference?.offers ? loggedUser.preference.offers: false,
  //   favorites:loggedUser?.preference?.favorites ? loggedUser.preference.favorites: false
  // }
  // )

  useEffect(()=>{
    if(loggedUser && loggedUser.addresses && loggedUser.addresses.length){
      setAllAddresses(loggedUser.addresses)}
      setUserData({
        firstName:loggedUser.firstName,
        lastName:loggedUser.lastName,
        username:loggedUser.username,
        photo:loggedUser.photo?.url,
        phoneNumber:loggedUser.phoneNumber,
      })
  },[loggedUser])

  useEffect(()=>{
  dispatch(getCountry())
    console.log(countries)
  },[])
  
  const dispatch = useDispatch()

  const handleProfileSubmit = ()=>{   
    dispatch(updateUserData(userData, loggedUser.id))
  }

  const handleAddressSubmit = (e)=>{
    e.preventDefault()
    setAllAddresses([...allAddresses, userAddress])
    dispatch(createAddress({...userAddress, userId: loggedUser.id}))
  }

  const handleSelectCountry = (e)=>{
  
    setSelectedCountry(countries.filter(country =>{
      return country.name === e.target.value

    }))
    setUserAddress({...userAddress, country:e.target.value})
  }

  // const handlePreferenceSubmit = ()=>{
  // }

  const deleteA = (id)=>{ 
   
    dispatch(deleteAddress(id))
    setAllAddresses(allAddresses.filter(el =>el.id!==id))
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");


    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tawaynaskp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setUserData({...userData, photo:file.secure_url});

};

  const handleDataChange = (e)=>{
   e.preventDefault()
   setUserData({...userData , [e.target.name]: e.target.value })
  }

  const handleAddressChange = (e)=>{
    e.preventDefault()
    setUserAddress({...userAddress , [e.target.name]: e.target.value })
   }

  // const handleCheckbox = (e)=>{
  //   e.preventDefault()
  //   setUserPreference({...userPreference , [e.target.name]: e.target.value === true ? false : true})
  //  }
   console.log("ALL ADDRESSES: ", allAddresses)

  return (
     
    <div className="w-full h-fit sm:pb-48 md:pb-4">
      <div className="bg-base-300 h-fit ">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mt-10 sm:mt-0 ">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Información Personal</h3>
                  <p className="mt-1 text-sm text-gray-600">Edite su información Personal.</p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleProfileSubmit}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Nombre
                          </label>
                          <input
                            placeholder={loggedUser.firstName}
                            value={userData.firstName}
                            onChange={handleDataChange}
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Apellido
                          </label>
                          <input
                            placeholder={loggedUser.lastName}
                            value={userData.lastName}
                            onChange={handleDataChange}
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">Foto</label>
                          <div className="mt-1 flex flex-col justify-between items-center">
                            <span className="inline-block h-20 w-20 overflow-hidden rounded-full bg-gray-100 mr-5">
                       
                              <img 
                          
                              src={userData.photo}
                              className="h-20 w-20 overflow-hidden object-cover"
                              alt="Usuario"
                              
                              />
                              
                            </span>
                          
    

                            <input
                              // className={style.seleccionarArchivo}
                              type="file"
                              name="file"
                              title={null}
                              onChange={uploadImage}
                              className="ml-10 mt-5
                               file:py-2 file:px-3 file:w-15
                              file:rounded-md file:border file:border-gray-300
                              file:text-sm file:font-medium file:shadow-sm
                              file:bg-white file:text-gray-700
                              hover:file:bg-gray-50"
                            />
                           
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Username
                          </label>
                          <input
                            placeholder={loggedUser.username}
                            value={userData.username}
                            onChange={handleDataChange}
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Teléfono
                          </label>
                          <input
                            placeholder={loggedUser.phoneNumber}
                            type="number"
                            value={userData.phoneNumber}
                            onChange={handleDataChange}
                            name="phoneNumber"
                            id="phoneNumber"
                            autoComplete="phone-number"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                          />
                        </div>
                      </div>
                    </div>
                        
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
              
                        className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0 ">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Cree una dirección</h3>
                  <p className="mt-1 text-sm text-gray-600">Agregue direcciones donde donde podrá recibir sus compras.</p>
                </div>
              </div>


              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleAddressSubmit}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        

                        {countries && <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Pais
                          </label>
                          <select
                            value={userAddress.country}
                            onChange={handleSelectCountry}
                            type="text"
                            name="country"
                            id="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm "
                          >
                            <option value={""}>Seleccione un país</option>
                            {countries.map(country  =>{
                              return( 
                              <option key={country.id} >{country.name}</option>
)
                            } )
                            
                            
                            }
                            
                          </select>
                        </div>}

                        {selectedCountry && selectedCountry.length ? <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Ciudad
                          </label>
                          <select
                            placeholder={loggedUser.cityOfOrigin}
                            type="text"
                            onChange={handleAddressChange}
                            name="city"
                            id="city"
                            autoComplete="city"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option >Seleccione una ciudad</option>
                            {selectedCountry[0].cities.map( city  =>{
                              return( 
                              <option id={city.id} value={city.name}>{city.name}</option>
)
                            })}

                          </select>
                        </div>: null}
                   

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                            Calle
                          </label>
                          <input
                            placeholder={loggedUser.address}
                            type="text"
                            value={userAddress.address}
                            onChange={handleAddressChange}
                            name="street"
                            id="street"
                            autoComplete="street"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Urbanismo
                          </label>
                          <input
                            // placeholder={loggedUser.cityOfOrigin}
                            type="text"
                            value={userAddress.neighborhood}
                            onChange={handleAddressChange}
                            name="neighborhood"
                            id="neighborhood"
                            autoComplete="address-level1"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                            Nro. de Casa/Apartamento
                          </label>
                          <input
                            // placeholder={loggedUser.cityOfOrigin}
                            type="text"
                            value={userAddress.houseNumber}
                            onChange={handleAddressChange}
                            name="houseNumber"
                            id="houseNumber"
                            autoComplete="address-level1"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>


                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Estado / Provincia
                          </label>
                          <input
                            // placeholder={loggedUser.cityOfOrigin}
                            type="text"
                            value={userAddress.state}
                            onChange={handleAddressChange}
                            name="state"
                            id="state"
                            autoComplete="address-level1"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                            ZIP / Código Postal
                          </label>
                          <input
                            // placeholder={loggedUser.cityOfOrigin}
                            type="text"
                            value={userAddress.zipCode}
                            onChange={handleAddressChange}
                            name="zipCode"
                            id="codigoPostal"
                            autoComplete="zipCode"
                            className="outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0 mb-40">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Sus Direcciones</h3>

                </div>
              </div>

              {allAddresses && allAddresses.length ? allAddresses.map((element) => {

                return(
                <div key={element.id} className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
             
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3 flex">
                        <img src="/assets/icons/map.png" alt="Location icon" className="w-5 h-5"/>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          {element.country}
                        </label>
                      </div> 
                      <div className="col-span-6 sm:col-span-3"> 
                        <button className="w-5 h-5 float-right hover:translate-y-1 hover:cursor-pointer" onClick={() => deleteA(element.id)}>  
                          <img src="/assets/icons/bin.png" alt="Location icon"  />
                        </button>
                      </div>
{/* 
                      <div className="col-span-6 sm:col-span-3">
                        <p  >{element.state}</p>
                      </div> */}

                      <div className="col-span-6 sm:col-span-3">
                        <p  >{element.city}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <p  >{element.street}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <p  >{element.neighborhood}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <p  >{element.houseNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>)
                        })

                :

                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                      
                    <p>No hay Direcciones</p>
                  
                  </div>
                </div>
                              
                              
                            
              } 
          
          </div>    
        </div>
      </div>    
    </div>
  </div>
  )
}

export default UserProfile;
