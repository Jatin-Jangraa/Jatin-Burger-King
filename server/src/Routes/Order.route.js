import express from 'express'
import { allorder, deleteorder, neworder, ordersbyID, updateorder } from '../Controller/Order.controller.js'



export const orderroute = express.Router()



orderroute.post("/" , neworder)


orderroute.get ("/all" ,allorder)


orderroute.put ("/:id",updateorder)


orderroute.delete("/:id",deleteorder)


orderroute.get("/orders/:id",ordersbyID)