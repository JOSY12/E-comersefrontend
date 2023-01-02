import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteFavorites, addFavorites } from "../../redux/actions"





export function RelatedProduct({product, componentId}) {
    const {loggedUser} =useSelector(state => state.user)
   const [isLiked, setisLiked] = React.useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()



   function likedHandle() {
        if(isLiked === true) {
            setisLiked(false)
            document.getElementById(`${product.name}`).classList.remove('fill')
            document.getElementById(`${product.name}`).style.opacity = '0%'
            document.getElementById(`${product.name}Broken`).classList.add('broken')
            document.getElementById(`${product.name}Broken`).style.display = 'inherit'
            setTimeout(() => {
                
                document.getElementById(`${product.name}Broken`).style.transition = 'all 1.5s linear'
               
                document.getElementById(`${product.name}Broken`).style.opacity = '0%'
            }, 1500)
            setTimeout(() => {
                setisLiked(false)
                document.getElementById(`${product.name}`).style.transition = 'all .5s linear'
                document.getElementById(`${product.name}`).style.opacity = '100%'
                
                
                dispatch(deleteFavorites({userId: loggedUser.id, productId: product.id}))
            }, 2000)
        }
        if(isLiked === false) {
            document.getElementById(`${product.name}`).classList.add('fill')
            dispatch(addFavorites({userId: loggedUser.id, productId: product.id }))
            setisLiked(true)
        }
   }
   
    React.useEffect(() => {
        loggedUser.favorite?.products?.map((favs) => {
            if(favs.id === product.id){
                setisLiked(true)
            }
        })
    }, [isLiked, loggedUser])
    
    return (
        <div className='relatedProducts'>
              <div id='muestra3'>
                  <div className='imageContainer'>
                    <button onClick={()=> navigate(`/Products/${product.id}`)}>
                          <img
                          src={product?.photos[0].url}
                          alt='card'
                          className='cardImage'
                            />          
                     </button>
                     {
                        loggedUser.id ? (
                            <div className='m3favoriteContainer'>
                            <button
                                onClick={() => likedHandle()}
                                className='likeAndViewButton'
                            >
                                <img
                                    src={
                                        isLiked
                                            ? '/assets/icons/likeFill.svg'
                                            : '/assets/icons/likeEmpty.svg'
                                    }
                                    alt='Favorite'
                                    id={`${product.name}`}
                                    className={isLiked? 'favorite fill': 'favorite'}
                                />
                                <img id={`${product.name}Broken`} src="/assets/icons/heartBroken.svg" className="favorite break" alt="heratBoken" />
                            </button>
                            
                            <div className='addToCart'>
                                <button className='addToCartButton'>
                                    <img
                                        src='/assets/icons/addToCart.svg'
                                        alt='add to cart'
                                    />
                                </button>
                            </div>
                        </div>
                        ) : (null)
                     }
                  </div>
                  <div className='detailsZone'>
                      <div className='productName'>
                        <h1>{product.name}</h1>
                      </div>
                      <div className='price'><h4>{product.price}</h4></div>
                  </div>
              </div>
          </div>
    )
}