import { useEffect, useState } from 'react'
import awsIkneliaAPI from "../api/ikneliaAPI"


export const useGetAmount = () => {

    interface Amount {
        clientId: string;
        tdcCreditLine: string;
        tddAmount: string;
      }

    const [stateAmount, setStateAmount] = useState<Amount>({
        clientId:"",
        tdcCreditLine: "",
        tddAmount: ""
    });

    const getAmount= async()=>
    {
        try{
            await awsIkneliaAPI().get<Amount>('/Prod/amounts/12345678').then(x=>{
                setStateAmount({
                    clientId:x.data.clientId,
                    tdcCreditLine: x.data.tdcCreditLine,
                    tddAmount:x.data.tddAmount
                })
            })
        }
        catch(e){
            console.log("error")
            console.log(e)
        }
    }
    return {
        stateAmount,
        getAmount
    }
    
}