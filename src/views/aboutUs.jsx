import React from "react"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import desarrolladores from "../hooks/desarrolladores"
import './aboutUs.css'






export function AboutUsPage({ open, setOpen }) {
    const navigate = useNavigate()
    
    
    function handleOpen(e) {
        if (open === true) {
            setOpen(false)
            setTimeout(() => {
                navigate('/aboutUs')
                setOpen(true)
                navigate(`/aboutUs/${e.name}`)
                
                
            }, 2000)
        } else {
            setOpen(true)
            navigate(`/aboutUs/${e.name}`)
            
       }
   }

    return (
        <div style={{width: '100%'}}>
            <div style={{padding: '1%'}}>
                <h1 style={{ fontSize: '3em', textAlign: 'center', width: '100%' }}>Nuestros desarrolladores: </h1>
            </div>
            <div style={{display: 'inline-flex', margin:'auto', width: '100%'}}>
                {
                    desarrolladores.map(desarrollador => {
                        return (
                            <div style={{ margin: 'auto', display: 'flex', textAlign: 'center' }}>
                                <button onClick={() => handleOpen(desarrollador)}>
                                    <div style={{display: 'flex', justifyContent: 'center', height: '11em' }}>
                                        <img alt='foto del desarrolador' src={desarrollador.photo} className='miniDev'  />
                                    </div>
                                     <div style={{padding: '1%', marginTop:'5%', border: '1px solid black', borderRadius: '3%', backgroundColor: 'black', color: 'white'}}><h2 style={{fontSize: '1.5em'}}>{desarrollador.name}</h2></div>
                                </button>
                               
                            </div>
                        )
                    })
                }
            </div>
            <Outlet />
            <div onPointerEnter={() => setOpen(false)} style={{width: '100%', textAlign: 'center'}}>
                <div style={{width: '100%'}}>
                    <h1 style={{fontSize: '3em'}}>Nuesta vision:</h1>
                </div>
            </div>
        </div>
    )
}


export function Desarrollador({open, setOpen}) {
    const desarrollador = useParams()
    const desarrolladorDetails = desarrolladores.filter(des => des.name === desarrollador.desarrollador)[0]
    const [classVar, setClass] = React.useState('closed')
    const navigate = useNavigate()
   
    

    function handleClose() {
        setOpen(false)
        setTimeout(() => {
            navigate('/aboutUs')
        }, 2100)
    }



    React.useEffect(() => {
        if (open === true) {
            setClass("open")
        } else {
            setClass('closed')
        }


        
    }, [open])


    return (
        <div className={classVar} >
           
            <div style={{ width: '100%' , height: 'fit-content' }}>
                <div><button onClick={() => handleClose()}><img src='/assets/icons/x-circle.svg'/></button></div>
                <div style={{ width: '50%', float: 'left', display: 'flex', justifyContent: 'center' }}>
                <div style={{ alignContent:'center', display:'flex', justifyContent:'center', backgroundColor: 'white', borderRadius: '50%', width: '26em', height:'26em' }}>
                    <img src={desarrolladorDetails.photo} className={`developerPhoto ${classVar}`} />
                        </div>
                </div>
                <div>
                    <div>
                        <h1 style={{ fontSize: '3em', textAlign: 'center' }}>{desarrolladorDetails.name}</h1>
                    </div>
                    <hr/>
                    <div style={{height: '20em'}}>
                        <h2>Aportes a la pagina: {desarrolladorDetails.aport }</h2>
                    </div>
                    <hr />
                    <div>
                        <p>{desarrolladorDetails.description}</p>
                    </div>
                </div>
                <hr />
                <div style={{float: 'right'}}>
                    <div style={{display:'block', width: '100%'}}><h2>Contacto y redes sociales:</h2></div>
                    <div style={{display: 'auto'}}>
                        {
                            desarrolladorDetails.redes.map(red => {
                                return (
                                   <div style={{margin: 'auto', display: 'inline-flex', padding: '1%'}}> <a href={red.href} target='_blank' style={{margin:'auto'}}><img src={red.icon} alt='icon' /></a></div>
                                )
                            })
                        }
                    </div>
                </div>
                </div>
                
            
        </div>
    )
}