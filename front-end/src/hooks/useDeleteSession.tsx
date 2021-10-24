import awsLexAPI from "../api/ikneliaAPI"
import {useEffect, useState } from 'react'

export const useDeleteSession = () => {

    const [stateDelete, setStateDelete] = useState(false);

    const deleteLexSession = async () => {
        try{
            await awsLexAPI().delete<any>('/Prod/deletesession/12345678').then(response => {
                if(response.status === 200){
                    setStateDelete(true)
                    console.log('Elimine session');
                }
            }).catch(e => e);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        deleteLexSession()
    }, [])

    return{
        stateDelete
    }
}