import axios from "axios"

const BASE_URL = 'http://127.0.0.1:3333'

export const postSubmitContract = (payload) => {
    return axios.post(`${BASE_URL}/make_contract`, payload,
        { ContentType: 'application/json' })
        .then((response) => console.log(response.data));
}