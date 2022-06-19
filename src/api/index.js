import axios from "axios"

const BASE_URL = 'http://45.76.185.234:8081'

export const postSubmitContract = (payload) => {
    return axios.post(`${BASE_URL}/make_contract_loan`, payload,
        { ContentType: 'application/json' })
}