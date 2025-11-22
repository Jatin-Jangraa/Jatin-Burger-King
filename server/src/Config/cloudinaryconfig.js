import {v2 as cloudinary }from 'cloudinary'
import multer from 'multer';
import {CloudinaryStorage}from 'multer-storage-cloudinary'



cloudinary.config({
 cloud_name:"dvkfvgzlp",
  api_key:"748897747985641",
  api_secret:"dwPeKxhctkSc_CxMXllhjFFG6Vo",
})

  const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({storage})


export  { cloudinary ,storage };






