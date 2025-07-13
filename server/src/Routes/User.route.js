import express from 'express'
import { allusers, deleteuser, login } from '../Controller/User.controller.js'


export const userroute = express.Router()



userroute.post("/login" , login)



userroute.get("/alluser",allusers)




userroute.delete("/delete/:uid" , deleteuser)