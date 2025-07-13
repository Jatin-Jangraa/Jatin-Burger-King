import {cloudinary} from "../Config/cloudinaryconfig.js";
import ProductData from "../Models/Product.model.js";

export const newproduct = async (req, res) => {
  try {
    const { name, price, ingredients, available } = req.body;
    const images = req.files.map((file) => file.path);

    const newproduct = await ProductData.create({
      name,
      price,
      ingredients,
      images,
      available,
    });

    res.json(newproduct);
  } catch (error) {
    console.log(error);
  }
};



export const allproducts = async (req, res) => {
  try {
    const products = await ProductData.find({});

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};



export const updataproduct = async (req, res) => {
  try {
    const {
      name,
      price,
      ingredients,
      available,
      existingImages = [],
    } = req.body;
    const newImages = req.files.map((file) => file.path);

    const updated = await ProductData.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        ingredients,
        available,
        images: [...existingImages, ...newImages],
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
  }
};

export const deleteproduct = async (req, res) => {
  try {
    await ProductData.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleImage = async (req, res) => {
  const { imageUrl } = req.body;
  const product = await ProductData.findById(req.params.id);

  product.images = product.images.filter((img) => img !== imageUrl);
  await product.save();

  // Remove from Cloudinary
  const publicId = imageUrl.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(`products/${publicId}`);

  res.json(product);
};



export const productbyid = async (req,res) =>{

try {
  


  const product = await ProductData.findById(req.params.id)

  res.json(product)


} catch (error) {
  console.log(error);
  
}
 

}