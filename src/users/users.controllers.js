import { signupUserSchema } from '../validators/user.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import { aToken } from '../tokens/jwt.js';
import { findUserByEmail, signUpUser } from './users.services.js';
import { generateUniqueNumber } from '../utils/accountNumber.js';
import { BankAccount } from '../models/bankaccount.js';
import { createAccount } from '../accounts/accounts.services.js';



export const signUpUserController = async (req, res) => {
    try {

        // first thing is to validate the users's input- using joi 
          const {error, value } = signupUserSchema.validate(req.body);
          
          // throw an error if a field is missing
          if(error) return res.status(400).json({error: error.message});
          
          // destructure user data into variable "value"
          let { firstName, lastName, email, SSN, password, accountType} = value;
          
          // check if user already exists with the email
          let user = await findUserByEmail({email: value.email});

          // throw an error if a user was found with that email
          if(user) return res.status(400).json({error: `Account already exists`});
          
          // hash, or encrypt user's password before storing into DB
          value.password = await hashPassword(password);
          
          user = await signUpUser(value);

        //   create an account for the user if no error
        let accountNumber = await generateUniqueNumber(10, BankAccount);

        const bankAccount = await createAccount({userID: user.id, accountNumber, accountType});

        return res.status(201).json({message: `user registered sucessfully`, user: user.toJSON(), bank: bankAccount.toJSON()});
        
    } catch (error) {

        console.log(`Error signing up user`, error);

        return res.status(500).json({error: `Internal Server Error`});
        
    }
};

export const loginUserController = async (req, res) => {
    try {

        // get data from frontend
  const {email, password} = req.body;
  
  // validate user's data manually
  if(!email || !password) return res.status(400).json({error: "email and password are rquired"});
  
  // check if user exists
  const userExists = users.find((user) => user.email === email);
  
  // throw an error if user is not found
  if(!userExists) return res.status(404).json({error: "User not found. Kindly create an account to login"});
  
  // check user's password
  const isMatch = await comparePassword(password, userExists.password);
  
  // throw an error if there's no match
  if(!isMatch) return res.status(400).json({error: "Inavlid Credentials"});
  const id = userExists.id;
  const role = userExists.role;
  
  const accessToken = aToken({id, role});
  
  // login upon successful validation
  return res.status(200).json({message: "User logged in successfully!", accessToken});
        
    } catch (error) {

        console.log("Error logging in user", error);

        return res.status(500).json({error: `Internal Server Error`});
        
    }
    
};

export const getUserController = (req, res) => {
    try {

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
        
    } catch (error) {

        console.log("Error getting users", error);

        return res.status(500).json({error: "Internal Server Error"});
        
    }
};

export const editUserDetailsController = async (req, res) => {
    try {

        // extract id from query params
        const id = req.params.id;
  
        // check if user with id exists
        const userExists = users.find((user) => user.id === id);
  
        // return an error if user doesnt exist
        if(!userExists) return res.status(404).json({error: `user not found with id ${id}`});
  
        // edit user attributes if no error is found
        Object.assign(userExists, req.body);
  
        return res.json({message: "User Updated Successfully", users});
        
    } catch (error) {

        console.log("Error Editting user details", error);

        return res.status(500).json({error: "Internal Server Error"});
        
    }
    
};