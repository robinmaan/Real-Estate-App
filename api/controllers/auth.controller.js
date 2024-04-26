import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken'



export const register = async(req,res)=>{
    const {username,email,password}= req.body;

    //HASHING PASSWORD
 
    try {
        // HASH THE PASSWORD
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        console.log(hashedPassword);
    
        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
    
        console.log(newUser);
    
        res.status(201).json({ message: "User created successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" });
      }
    };
    

export const login = async(req,res)=>{
  const {username , password } = req.body
    //db operations
    try {
      //CHECK IF THE USER IS EXIST 
      const user = await prisma.user.findUnique({
        where:{username}
      })
      if(!user) res.status(401).json({message:"Undefined"})

    //CHECK THE PASSWORD IS CORRECT
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect) res.status(401).json({message:"invlid password"})

      
    const age = 1000 * 60 * 60 *24 *7;
    //GENERATE THE TOKENS ANS//SEND THE TOKEN TO THE USER
    //  res.setHeader("Set-Cookie","test=" + "myValue").json("success")
      const token = jwt.sign({
        id:user.id
      },process.env.SECRET_KEY,{
        expiresIn:age
      });


    res.cookie("token",token,{
      HttpOnly:true,
      secure:true,
      maxAge:age
    }).status(200).json({message:"success login"})


    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Failed to login!"})
    }
    
}
export const logout = (req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout successfull"})
}