import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';

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

app.listen(config.port, () => {
    console.log(`server running on ${config.port}`);
});

router.get('/', (req, res) => {
    res.send("Hello World")
});

router.get('/users', (req, res) => {
    res.send(users)
});

router.post('/users/register', (req, res) => {
    const {id, firstName, lastName, email, password, role, createdAt} = req.body;
    users.push({id, firstName, lastName, email, password, role, createdAt});
    return res.send("user registered sucessfully", users);
});

router.get('/products', (req, res) => {
    res.send("This is the products endpoint")
});