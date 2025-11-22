import express from 'express'
import { allorder, deleteorder, neworder, ordersbyID, updateorder } from '../Controller/Order.controller.js'
import { checkadmin } from '../middleware/Checkadmin.js'



export const orderroute = express.Router()



orderroute.post("/" , neworder)


orderroute.post ("/all" ,checkadmin,allorder)


orderroute.put ("/:id",checkadmin,updateorder)


orderroute.delete("/:id",checkadmin,deleteorder)


orderroute.get("/orders/:id",ordersbyID)