import express from 'express'
import { allusers, deleteuser, login } from '../Controller/User.controller.js'
import { checkadmin } from '../middleware/Checkadmin.js'


export const userroute = express.Router()



userroute.post("/login" , login)



userroute.post("/alluser",checkadmin, allusers)




userroute.delete("/delete/:uid" ,checkadmin, deleteuser)