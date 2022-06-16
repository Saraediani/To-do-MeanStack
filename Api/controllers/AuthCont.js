import User from '../model/userAuth.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async(req,res) => {
    try {
        // Get user input
        const { name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && name )) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
    
    };
    

const login = async(req,res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(401).send("Invalid Email or Password");
        }

        // Validate if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).send("Invalid Email or Password");
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        // return token
        res.status(200).json({ token });
      } catch (err) {
        console.log(err);
      }

    }



        
    //     if (user && (await bcrypt.compare(password, user.password))) {
    //       // Create token
    //       const token = jwt.sign(
    //         { user_id: user._id, email },
    //         process.env.JWT_KEY,
    //         {
    //           expiresIn: "2h",
    //         }
    //       );
    
    //       // save user token
    //       user.token = token;
    //       await user.save()
    
    //       // user
    //     //   res.status(200).json(user);
    //       res.send(token);
    //     }
    //     res.status(400).send("Invalid Credentials");
    //   } catch (err) {
    //     console.log(err);
    //   }
      
    // };
    

export {register,login}