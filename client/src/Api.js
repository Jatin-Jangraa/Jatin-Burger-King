import axios from 'axios'


export const userapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user`
})


export const productapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product`
})


export const locationapi = axios.create ({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/location`

})


export const orderapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/order`
})



export const dashapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/dashboard`
})



export const contactapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/contact`
})


export const confirmapi = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/confirm`
})
