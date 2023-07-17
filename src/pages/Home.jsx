import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ContactList from "../components/contacts"
import axios from 'axios'


export const Home = () =>{
    const [data,setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState('')
    const [errorDel,setErrorDel] = useState('')
    useEffect(() => {
        
        const getContact =async () =>{
            try{
            setIsLoading(true)
             const {data} = await  axios.get('  http://localhost:3000/contacts')
             setData(data)
             setIsLoading(false)
            }catch(e){
            setError(e)
            }
        } 
        getContact();
    },[])
    
    function handleErrorDel (e){
        setErrorDel(e.message);
        console.log(errorDel)
    }
    function handleDelete (id){
        if(errorDel == ''){
            const newList = data.filter((obj) => obj.id !== id)
        
            setData([...newList])
        }
       
    }

if (isLoading) {
    return (
      <div>
            Loading ...
      </div>
     )
  }   

if(error){
    return(
        <div className='w-full h-screen flex justify-center items-center'>
            <h1 className='text-6xl'>can not conect to server</h1>
        </div>
    )
} 

    return(
        <div className="w-full min-h-screen bg-stone-800 flex flex-col gap-2 items-center">
            <div className="w-2/3 flex justify-between p-4 border-b  mt-6">
                <h1 className="text-white text-4xl">Contact List</h1>
                <Link to='/addcontact'><button className="bg-slate-500 text-white text-6xl flex flex-row justify-center items-start w-[44px] h-[44px] rounded-full active:bg-slate-600 active:scale-95">+</button></Link>
            </div>
            <div className="w-2/3 flex justify-center">
                <ContactList data={data} handleDelete={handleDelete} handleErrorDel={handleErrorDel}/>
            </div>
            {errorDel != '' ? <div className="absolute bottom-1/3 text-6xl text-white">{errorDel}</div> : ''}
        </div>
    )
}