import axios from "axios"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Addcontact = () =>{
    const [name,setName] = useState('')
    const [number,setNumber] = useState('')
    const [contacts,setContacts] = useState([])
    const [isValid,setIsValid] = useState(false)
    const [isName,setIsName] = useState(false)
    const [isnumber,setIsnumber] = useState (false)
    const [errorPost,setErrorPost] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const navigat = useNavigate()
    const idRef = useRef()
    useEffect(() => {
        
        const getContact =async () =>{
            try{
             const {data} = await  axios.get('  http://localhost:3000/contacts')
             setContacts(data)
             idRef(contacts.length)
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
    const handlePostContact =  () => {
        setIsLoading(true)
        if(isValid){
            setTimeout(() => {
            
                const post = async () =>{
                    try{
                        
                        await axios.post('  http://localhost:3000/contacts',{
                            id:idRef.current,
                            name: name,
                            number:number
                        }).then((res) => {
                            if(res.status == 201){
                                idRef.current = idRef.current + 1 
                                navigat('/')
                            }
                            setErrorPost('')
                            setName('')
                            setNumber('')
                        })
                    }catch(e){
                        setErrorPost(e.message)
                    }
                }
                post();
            
        }, 3000);
        
        }
    }

    const handleEnterKey = (e) =>{
        if(isValid){
            if(e.key == 'Enter'){
                handlePostContact();
            }
        }
        
    }

    return(
        <>
        <div className={clsx("w-full h-screen flex justify-center items-center bg-zinc-950 ",{'blur-sm':isLoading===true})}>
            
            <div  className="w-1/4  flex flex-col gap-2 p-7 bg-zinc-900 rounded-md">
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

                <div className="w-full flex flex-col gap-1 ">
                    <button className="w-full py-3 m-auto mt-6 text-2xl rounded flex justify-center bg-green-600 font-medium text-black" type="submit"  onClick={handlePostContact} disabled = {isValid === false ? true : false}>Submit</button>  
                </div>
            </div>
        </div>
        <span className="absolute top-[60%] w-full flex justify-center items-center text-5xl m-auto text-red-800">{errorPost != '' ? errorPost : ''}</span>
        {isLoading == true ? <div className="absolute top-1/2 w-full flex justify-center items-center text-gray-300 text-6xl">Wait a moment please...</div> : ''}
    </>  
    )
}