import axios from 'axios'
import { BASE_URL } from '../constants/urls'

export async function login(access_token) {
    try {
        const response = await axios({
            method: 'post',
            url: BASE_URL + '/users/google/',
            headers: { "Content-Type": "application/json"},
            data:{
                access_token,
                code:200
            }
        })
        return {
            status: response.status,
            response: response.data
        }
    }
    catch(e){
        return {
            status: e.response?e.response.status:e.status,
            errMsg: e.response.data
        }
    }
   
}
export async function get_profile(access_token) {
    try {
        const response = await axios({
            method: 'get',
            url: BASE_URL+'api/users/me',
            headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${access_token}`},

        })

        return {
            status: response.status,
            response: response.data
        }
    }
    catch(e) {
        return {
            status: e.response? e.response.status:e.status,
            errMsg: e.response.data
        }

    }
}