import express from 'express'
import { allproducts, deleteproduct, deleteSingleImage, newproduct, productbyid, updataproduct } from '../Controller/Product.controller.js'

import multer from 'multer'
import  {storage}  from '../Config/cloudinaryconfig.js'

export const productroute = express.Router()
const upload = multer({storage})

productroute.get("/",allproducts)

productroute.get("/:id",productbyid)


productroute.post("/",upload.array("images"),newproduct)




productroute.put("/:id",upload.array("images"),updataproduct)



productroute.delete("/:id",deleteproduct)

productroute.post("/:id/remove-image",deleteSingleImage)

