import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"



export const Contact = () => {
    const [contact,setContact] = useState([])
    const param = useParams();
    useEffect(() => {
        
            const getContact =async () =>{
                try{
                 const {data} = await  axios.get(`http://localhost:3000/contacts/${param.id}`)
                 setContact(data)
                }catch(error){
                console.log(error)
                }
            } 
            getContact();
    },[])


    const {name,number} = contact
    return(
        <div>
            <h1>{name}</h1>
            <span>{number}</span>
        </div>
    )
}