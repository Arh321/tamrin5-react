
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { DeleteContact } from './DeleteContact'
import { Link } from 'react-router-dom'



const ContactList = ({data , handleDelete,handleErrorDel}) =>{
    

    

     

    return(
        <div className={clsx(
            'w-full flex flex-col gap-2'
        )}>
            {
                data.map((item) => {
                    return(
                        
                        <div key={item.id} className='w-full border-b-2 rounded-md py-2 px-2 flex justify-between'>
                            
                            <Link to={`/addcontact/${item.id}`}>
                                <div className='flex gap-2 items-center'>
                                    <div className='ml-2 w-[32px] h-[32px] rounded-full flex justify-center items-start text-4xl bg-slate-500'>
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                    <h1 className='text-gray-300 text-2xl '>Name: {item.name}</h1>
                                    <span className='text-gray-300 text-2xl'>Number: {item.number}</span>
                                    </div>
                                </div>
                            </Link>
                            <div className='flex gap-2 items-center'>
                                <Link to={`/editcontact/${item.id}`}><p className='bg-slate-400 p-1 px-2 rounded-2xl text-2xl'>edite</p></Link>
                                <DeleteContact id={item.id} handlOnDelete={handleDelete} handleErrorDel={handleErrorDel}/>
                                
                            </div>
                        </div>
                        
                        
                    )
                })
            }
        </div>
    )
}

export default ContactList;