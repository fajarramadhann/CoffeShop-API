// src/controllers/userController.js
import Users from '../models/Users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get All Users
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
          status: 500,
          msg: 'Internal Server Error',
          error: error.msg
        })
    }
}

export const createUser = (req, res) => {
  const { username, email, password: hashedPassword } = req.body;
  Users.findOne({ 
    where: { 
      email: email 
    } 
  })
  .then((cekEmail) => {
    if (cekEmail != null) {
      res.status(409).json({ msg: "email already in use" })
    }
  })
}


const UserController = {
  async register(req, res) {
      try {
    const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 8);
      await Users.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
  async login(req, res) {
      const { username, email, password } = req.body;
      try {

    // Cari User
      const user = await Users.findOne({ where: { username } });

      if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

    //   Validasi email
      const email = await Users.findOne({ where: { email } })
      if (!email) {
        res.status(401).json({ error: "Invalid email" })
        return;
      }

    //   Matching Password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

    //   JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

export default UserController;