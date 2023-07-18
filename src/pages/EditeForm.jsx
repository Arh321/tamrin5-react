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
    const [isName,setIsName] = useState(true)
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
        <div className={clsx("w-full h-screen flex justify-center items-center bg-zinc-950",{'blur-sm':isLoading===true})}>
            <div ref={loading} className="w-1/4  flex flex-col gap-2 p-7 bg-zinc-900 rounded-md">
                <h1 className="mx-auto text-4xl text-green-600 font-semibold">SIGN IN</h1>
                <div className="w-full flex flex-col gap-2 py-2">
                    <label className="text-3xl text-green-500 font-medium" htmlFor="name">Name</label>
                    <input 
                    className={clsx("p-4 bg-transparent bg-zinc-800  rounded-md text-gray-400 border border-zinc-800 text-2xl  focus:outline-0",
                    {'focus:border-green-500':isName===true},
                    {'focus:border-red-500':isName===false},
                    {'border-black': name.length == 0}
                    )}
                    value={name} onKeyDown={(e) => handleEnterKey(e)} onChange={handleName} type="text" placeholder="Your name..."/>
                    {isName == true ? <span className="text-xl text-green-600 mt-1">Ok!</span> : <span className="text-xl text-red-600 mt-1">Not Ok!</span>}
                </div>
                <div className="w-full flex flex-col gap-2 py-2">
                    <label className="text-3xl text-green-500 font-medium" htmlFor="number">Number</label>
                    <input className={clsx("p-4 bg-transparent bg-zinc-800  rounded-md text-gray-400 text-2xl border border-zinc-800  focus:outline-0 ",
                    {' focus:border-green-500':isnumber===true},
                    {'focus:border-red-500':isnumber===false},
                    {'border-black': number.length == 0}
                    )} 
                    value={number} onKeyDown={(e) => handleEnterKey(e)} onChange={handleNumber} type="text" placeholder="Your number..."/>
                    {isnumber == true ? <span className="text-xl text-green-600 mt-1">Ok!</span> : <span className="text-xl text-red-600 mt-1">Not Ok!</span>}
                </div>
                <div className="w-full flex">
                    <button className="w-full py-3 m-auto mt-6 text-2xl rounded flex justify-center bg-green-600 font-medium text-black" 
                    type="submit" onClick={handlePutContact} disabled = {isValid === false ? true : false}>Edit</button>   
                </div>
            </div>
            
        </div>
        <span className="absolute top-[60%] w-full flex justify-center items-center text-5xl m-auto text-red-800">{errorEdit != '' ? errorEdit : ''}</span>
        {isLoading == true ? <div className="absolute top-1/2 w-full flex justify-center items-center text-gray-300 text-6xl">Wait a moment please...</div> : ''}
        </>
    )
}