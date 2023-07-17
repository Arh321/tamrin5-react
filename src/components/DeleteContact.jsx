import { Icon } from '@iconify/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const DeleteContact = ({id,handlOnDelete,handleErrorDel}) => {
    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        try{
         await axios.delete(`http://localhost:3000/contacts/${id}`)
        .then(res => console.log(res.status))
        }catch(e){
            handleErrorDel(e);
        }
        handlOnDelete(id);
    }


    return(
        <button className='text-white' onClick={() => deleteProduct(id)}><Icon icon="mingcute:delete-line" width='20' height='20'/></button>
    )
}