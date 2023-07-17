import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import clsx from "clsx"



export const EditeForm = () =>{
    const [name,setName] = useState('')
    const [number,setNumber] = useState('')
    const [contact,setContact] = useState()
    const [isValid,setIsValid] = useState(true)
    const [isnumber,setIsnumber] = useState (true)
    const [isName,setIsName] = useState(false)
    const [errorEdit,setErrorEdit] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const param = useParams();
    const navigat = useNavigate();
    const loading = useRef('')
    useEffect(() => {
        
        const getContact =async () =>{
            try{
             const {data} = await axios.get(`http://localhost:3000/contacts/${param.id}`)
             setContact(data)
             setName(data.name)
             setNumber(data.number)
            }catch(error){
            console.log(error)
            }
        } 
        getContact();
        
    },[])

    const handleName = (e) =>{
        setName(e.target.value)
        const letters = 'zxcvbnmlkjhgfdsaqwertyuiopMNBVCXZASDFGHJKLPOIUYTREWQ'
        if(letters.indexOf(e.target.value.split('')[e.target.value.length - 1]) != -1){
            setIsName(true)
            if(isnumber){
                setIsValid(true)
            }
        }else{
            setIsName(false)
            setIsValid(false)
        }
    }
    const handleNumber = (e) =>{
        const nums = '01234567890'
            nums.split('')
        if(nums.indexOf(e.target.value.split('')[e.target.value.length - 1]) != -1 || e.target.value == ''){
            setNumber(e.target.value)
        }
        
        if(e.target.value.length > 9){
            setIsnumber(true)
            if(isName){
                setIsValid(true)
            }
        }else{
            setIsnumber(false)
            setIsValid(false)
        }
    }

    function handleErrorEdit (e){
        setErrorEdit(e.message)
        console.log(errorEdit)
    }

    const handlePutContact =  () => {
        setIsLoading(true)
        setTimeout(() => {
            if(isnumber === false || name.length == 0){
                setIsValid(false)
            }else{
                setIsValid(true)
                    const put = async () =>{
                    try{
                      await  axios.put(`http://localhost:3000/contacts/${param.id}`,{
                            id:param.id,
                            name: name,
                            number:number
                        }).then((res) => {
                            if(res.status == 200){
                                navigat('/')
                            }
                            setErrorEdit('')
                        })
                        
                    }catch(e){
                        handleErrorEdit(e)
                    }
                }
                put();
            }
        },3000)   
    }

    const handleEnterKey = (e) =>{
        if(isValid){
            if(e.key == 'Enter'){
                handlePutContact();
            }
        }
        
    }

    return(
        <>
        <div className={clsx("w-full h-screen flex justify-center items-center bg-stone-800 ",{'blur-sm':isLoading===true})}>
            <div ref={loading} className="w-1/4 h-2/5 flex flex-col gap-2 p-7 bg-neutral-600 rounded-md">

                <label className="text-4xl text-gray-300 font-semibold font-mono" htmlFor="name">Name</label>
                <input 
                className={clsx("p-4 bg-transparent border-2  rounded-full border-gray-400 text-2xl  focus:outline-0",
                {'focus:border-green-500':isName===true},
                {'focus:border-red-500':isName===false},
                {'border-black': name.length == 0}
                )}
                 value={name} onKeyDown={(e) => handleEnterKey(e)} onChange={handleName} type="text" placeholder="Your name..."/>
                {isName == true ? <span className="text-2xl text-green-500">Ok!</span> : <span className="text-2xl text-red-500">0Not Ok!</span>}
                <label className="mt-4 text-4xl text-gray-300  font-mono font-semibold" htmlFor="number">Number</label>
                <input className={clsx("p-4 bg-transparent border-2 text-gray-300  rounded-full border-gray-400 text-2xl  focus:outline-0",
                {'focus:border-green-700':isnumber===true},
                {'focus:border-red-700':isnumber===false},
                {'border-gray-400': number.length == 0}
                )} 
                value={number} onKeyDown={(e) => handleEnterKey(e)} onChange={handleNumber} type="text" placeholder="Your number..."/>
                {isnumber == true ? <span className="text-2xl text-green-500">Ok!</span> : <span className="text-2xl text-red-500">Not Ok!</span>}
                
                <button className="w-1/3 py-3 m-auto mt-6 text-2xl rounded-full flex justify-center bg-blue-600 text-white" 
                type="submit" onClick={handlePutContact} disabled = {isValid === false ? true : false}>Edit</button>
                <span className="m-auto text-red-700">{errorEdit != '' ? errorEdit : ''}</span>
            </div>
            
        </div>
        {isLoading == true ? <div className="absolute top-1/2 left-1/3 text-6xl">Wait a moment please...</div> : ''}
        </>
    )
}