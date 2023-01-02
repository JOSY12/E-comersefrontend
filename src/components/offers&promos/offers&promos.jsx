import React from "react"
import ReactDOM from 'react-dom'
import './offers&promos.css'
import axios from 'axios'




let index = 0
let messages = []
 
function incraseIndex() {
    if (index === messages.length - 1) {
        index = 0
    } else {
        index+=1
    }
    
}



class OffersPromos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            message: '',
           
          
            
        }
    }
   async allMessages() {
    try {
        const allMessages = await axios.get('/message')
        messages = allMessages.data
        
    } catch (error) {
        throw new Error(error)
    }
}
    
    async componentDidMount() {
        await this.allMessages()
        
        setInterval(() => {
            this.setState({
                show: true,
                message: messages[index].message
            })
            setTimeout(() => {
                this.setState({show: false})
            }, 30000)
        }, 60000)
   }
    
   
  

    render() {
        return (
            <div  style={{position: 'relative', top:'0', left:'0', backgroundColor: 'blue'}}>
                {
                    this.state.show && ReactDOM.createPortal(
                        <div id='carrousel'>
                            <p className="carrouselText">{this.state.message}</p>
                        </div>, document.querySelector('#offers')
                    )
               }
            </div>
        )
    }
}

setInterval(() => {
    incraseIndex()
}, 55000)


export default OffersPromos