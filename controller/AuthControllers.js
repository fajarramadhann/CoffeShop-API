import Users from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Generate token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
  };
// Expired token in
  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password){
      return res.status(400).json({ error: "Username, Email and Password are required" })
    }

    // Cek username
    const cekUsername = await Users.findOne({
      where: {
        username: username
      }
    });
    if(cekUsername){
      return res.status(400).json({ error: "Username already exists"});
    }
    
    // Cek email
    const cekEmail = await Users.findOne({
      where: {
        email: email
      }
    });
    if(cekEmail){
      return res.status(400).json({ error: "Email already exists"});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser)
    res.status(201).json({ msg: "Register Berhasil", user: newUser, token })
  
  } catch (error) {
    console.error('Error register user:', error)
    res.status(500).json({ msg: "Username atau Email sudah digunakan!" })
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" })
    }

    // Cari User
    const user = await Users.findOne({
      where: {
        username: username
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Username or Password" });
    }

    // Matching Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = generateToken(user)
    res.status(200).json({ msg: "Login Berhasil", user: user, token });

  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: "Internal server error!"})
  }
}

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

// export const createUser = (req, res) => {
//   const { username, email, password: hashedPassword } = req.body;
//   Users.findOne({ 
//     where: { 
//       email: email 
//     } 
//   })
//   .then((cekEmail) => {
//     if (cekEmail != null) {
//       res.status(409).json({ msg: "email already in use" })
//     }
//   })
// }


// const UserController = {
//   async register(req, res) {
//       try {
//     const { username, email, password } = req.body;

//       const hashedPassword = await bcrypt.hash(password, 8);
//       await Users.create({ username, email, password: hashedPassword });
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

  
//   async login(req, res) {
//       const { username, email, password } = req.body;
//       try {

//     // Cari User
//       const user = await Users.findOne({ where: { username } });

//       if (!user) {
//         res.status(401).json({ error: 'Invalid username or password' });
//         return;
//       }

//     //   Validasi email
//       const email = await Users.findOne({ where: { email } })
//       if (!email) {
//         res.status(401).json({ error: "Invalid email" })
//         return;
//       }

//     //   Matching Password
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (!passwordMatch) {
//         res.status(401).json({ error: 'Invalid username or password' });
//         return;
//       }

//     //   JWT token
//       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
//       res.status(200).json({ token });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },

// };

// export default UserController;