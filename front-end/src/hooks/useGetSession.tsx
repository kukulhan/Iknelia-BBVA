import awsLexAPI from "../api/ikneliaAPI"
import { useEffect, useState } from 'react'


export function useGetSession() {
    try {
        return awsLexAPI().get<any>('/Prod/getsession/12345678').then((response) => {
            if (response.data === 200) {
                return new Promise((resolve, reject) => {
                    resolve({"token":200});
                })
            } else {
                return new Promise((resolve, reject) => {
                    resolve({"token":200});
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}
