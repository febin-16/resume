import axios from "axios"
import { BASE_URL } from "../constants/urls.js"

export async function UserReg(token, data, user_name, email_id) {
    try {
        const response = await axios({
            method: 'post',
            url: BASE_URL + '/api/users/me',
            headers: { "Content-Type": "application/json", "Authorization": `token ${token}` },
            data: {
                ...data,
                username: user_name,
                email_id: email_id,
                phone_number: "+91" + data.phone_number,
                profile_completed: true
            }
        })
        return {
            status: response.status,
            response: response.data
        }
    } catch (e) {

        return {
            status: e.response ? e.response.status : e.status,
            errMssg: e.response.data
        }
    }
}
