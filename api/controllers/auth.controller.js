import bcrypt from 'bcrypt'

export const register = async(req,res)=>{
    const {username,email,password}= req.body;

    //HASHING PASSWORD
  const hashedPassword = await bcrypt.hash(password,10) 
  console.log(hashedPassword)
    //CREATING NEW USER
}
export const login = (req,res)=>{
    //db operations
}
export const logout = (req,res)=>{
    //db operations
}