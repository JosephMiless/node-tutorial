import { products } from "./products.services.js";
import { addProdcutsSchema } from '../validators/products.js';

export const getAllProdcts = (req, res) => {
    try {
        return res.status(200).json({products});
    } catch (error) {

        console.log("Error getting all products", error);
        
        return res.status(500).json({error: "Internal Server Error"});
        
    }
    
};

export const addProducts = (req, res) => {
    try {

        console.log("abc", req.headers);

          // get data from fontend
  const {error, value} = addProdcutsSchema.validate(req.body);
  
  // throw an error if needed
  if(error) return res.status(400).json({error: error.message});
  
  // destructure value coming from frontend
  const {name, id, price, category} = value;
  
  // check if product exists already
  const productExists = products.find((product) => product.id === value.id);
  
  // throw an error if product exists
  if(productExists) return res.status(400).json({error: `product exists with id: ${id}`});
  
  // save product of no error
  products.push(value);
  
  return res.status(201).json({message: `Product added successfully`, products});
        
    } catch (error) {

        console.log("Error adding products", error);
        
        return res.status(500).json({error: "Internal Server Error"});
        
    }
    
};

export const deleteProducts = (req, res) => {

    try {

          // grab id from the request params
  const id = req.params.id;
  
  // check if product with id exists
  
  const productExists = products.find((exixts) => exixts.id === parseInt(id));
  
  // throw error if product is not found
  if(!productExists) return res.status(404).json({error: `product not found with id ${id}`});
  
  // delete product
  const productsLeft = products.filter((product) => product.id !== parseInt(id));
  
  // return products left
  return res.status(201).json({meessage: `product deleted successfully: `, productsLeft});
        
    } catch (error) {

        console.log("Error deleting products", error);
        
        return res.status(500).json({error: "Internal Server Error"});
        
    }
    
};