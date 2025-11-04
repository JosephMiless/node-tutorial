import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import { signupUserSchema } from './validators/user.js';
import { comparePassword, hashPassword } from './utils/bcrypt.js';
import { addProdcutsSchema } from './validators/products.js';

const app = express();

const router = Router();

app.use(express.json());

app.use(router);

const users = [
  {
    id: "u1",
    firstName: "Miles",
    lastName: "Ogunleye",
    email: "miles.ogunleye@example.com",
    password: "hashed_password_1",
    role: "user",
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: "u2",
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada.okafor@example.com",
    password: "hashed_password_2",
    role: "admin",
    createdAt: "2025-02-10T09:45:00Z"
  },
  {
    id: "u3",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "hashed_password_3",
    role: "user",
    createdAt: "2025-03-05T14:20:00Z"
  },
  {
    id: "u4",
    firstName: "Sarah",
    lastName: "Bello",
    email: "sarah.bello@example.com",
    password: "hashed_password_4",
    role: "staff",
    createdAt: "2025-04-18T11:10:00Z"
  },
  {
    id: "u5",
    firstName: "David",
    lastName: "Adeyemi",
    email: "david.adeyemi@example.com",
    password: "hashed_password_5",
    role: "user",
    createdAt: "2025-05-25T16:00:00Z"
  }
];

const products =[
    {
        
  "name": "Laptop",
  "id": 2,
  "price": 2500000,
  "category": "Electronics"
},
{
  "name": "spoon",
  "id": 4,
  "price": 2500,
  "category": "Kitchen Utensils"
},
{
    "id": 6,
    "name": "Rolex",
    "price": 450000,
    "category": "Wristwatches"
}
];

router.get('/', (req, res) => {
  res.send("Hello Earth");
});

router.get('/users', (req, res) => {

  // grab user id from the url
  const {id} = req.query;

  if(id){

    // check if user exists with the provided id
    const user = users.find((user) => user.id === id);

    // throw an error if user isn't found
    if(!user) return res.status(404).json({error: `no user found with id: ${id} `});

    // return the found user
    return res.status(200).json({user});

  };

  // if no id was sent in the url, return all users
  return res.status(200).json({users});
});

// router.post('/users', (req, res) => {

//   //grab data from frontend
//   const {id, firstName, lastName, email} = req.body;

//   if(!id ) return res.status(400).json({error: "Kindly fill out id field"});
//   if(!firstName) return res.status(400).json({error: "Kindly fill out firstname field"});
//   if(!lastName) return res.status(400).json({error: "Kindly fill out lastname field"});
//   if(!email) return res.status(400).json({error: "Kindly fill out email field"});

//   // check if the user already exists by email
//   const user = users.find((user) => user.email === email);

//   if(user) return res.status(400).json({error: "user already exists with that email"});

//   users.push({id, firstName, lastName, email});

//   return res.status(201).json({message: 'user registered successfully', users});


// });

router.post('/users/register', async (req, res) => {

  // first thing is to validate the users's input- using joi 
  const {error, value } = signupUserSchema.validate(req.body);

  // throw an error if a field is missing
  if(error) return res.status(400).json({error: error.message});
  
  // destructure user data into variable "value"
  let {id, firstName, lastName, email, password, role, createdAt} = value;

  // check if user already exists with the email
  const user = users.find((user) => user.email === email);

  // throw an error if a user was found with that email
  if(user) return res.status(400).json({error: "Account already exists"});
  
  // hash, or encrypt user's password before storing into DB
  value.password = await hashPassword(password);
  
  users.push(value);
  return res.status(201).json({message: "user registered sucessfully", users});
});

router.post('/users/login', async (req, res) => {

  // get data from frontend
  const {email, password} = req.body;

  // validate user's data manually
  if(!email || !password) return res.status(400).json({error: "email and password are rquired"});

  // check if user exists
  const userExists = users.find((user) => user.email === email);

  // throw an error if user is not found
  if(!userExists) return res.status(404).json({error: "User not found. Kindly create an account to login"});

  // check user's password
  const isMatch = await comparePassword(password, );

  // login upon successful validation
  return res.status(200).json({message: "User logged in successfully!"});
  
});

router.patch('/users/:id', (req, res) => {

  // extract id from query params
  const id = req.params.id;

  // validate user input
  if(!id) return res.status(400).json({error: "id is required"});

  // check if user with id exists
  const userExists = users.find((user) => user.id === id);

  // return an error if user doesnt exist
  if(!userExists) return res.status(404).json({error: `user not found with id ${id}`});

  return res.json({message: "patch endpoint"});
});

router.get('/products', (req, res) => {
  return res.status(200).json({products});
});


router.post('/products', (req, res) => {

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

});

router.delete('/products/:id', (req, res) => {

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

});

  app.listen(config.port, () => {
      console.log(`server1 running on ${config.port}`);
  });