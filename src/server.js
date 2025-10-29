import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import { signupUserSchema } from './validators/user.js';
import { hashPassword } from './utils/bcrypt.js';

const app = express();

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

const router = Router();

app.use(express.json());

app.use(router);


router.get('/', (req, res) => {
  res.send("Hello Earth")
});

router.get('/users', (req, res) => {

  // grab user id from the url
  const {id} = req.query;

  if(id){

    const user = users.find((user) => user.id === id);

    if(!user) return res.status(404).json({error: `no user found with id: ${id} `});

    return res.status(200).json({user});

  };

  return res.status(200).json({users});
});

router.post('/users/register', async (req, res) => {

  // first thing is to validate the users's input- using joi 
  const {error, value } = signupUserSchema.validate(req.body);

  // throw an error if a field is missing
  if(error) return res.status(400).json({error: error.message});
  
  // destructure user data into variable "value"
  const {id, firstName, lastName, email, password, role, createdAt} = value;

  // check if user already exists with the email
  const user = users.find((user) => user.email === email);

  // throw an error if a user was found with that email
  if(user) return res.status(400).json({error: "Account already exists"});
  
  // hash, or encrypt user's password before storing into DB
  const hashedPassword = await hashPassword(password);
  
  users.push({ id, firstName, lastName, email, password:hashedPassword, role, createdAt});
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
  if(userExists.password !== password) return res.status(400).json({error: "Invalid credentials"});

  // login upon successful validation
  return res.status(200).json({message: "User logged in successfully!"});
  
});

router.get('/products', async (req, res) => {
  res.send("This is thje product endpoint")
});

  app.listen(config.port, () => {
      console.log(`server1 running on ${config.port}`);
  });