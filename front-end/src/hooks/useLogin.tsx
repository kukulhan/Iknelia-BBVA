import React from 'react'
import {useState} from 'react';

export const useLogin = <T extends Object> (initState : T) => {
    
    const [state, setstate] = useState(initState);
    
    const onChange = (value: string, field : keyof T) => {
        setstate({
            ...state,
            [field]: value
        });
    }
    return {
        ...state,
        form: state,
        onChange
    }
}
