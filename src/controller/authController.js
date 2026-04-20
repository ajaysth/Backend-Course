import {prisma} from "../config/db.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../utils//generateToken.js"

const register = async (req,res)=>{
    const {name,email,password} = req.body

    //check if email is already there or not
    const userExists = await prisma.user.findUnique({
        where:{
            email: email,
        }
    })

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
}

    if(userExists){
        return res.status(400).json({message:"User already exists"})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)

    //create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedpassword
        }
    })

    //generate JWT token
    const token = generateToken(user.id,res)

    res.status(201).json({status:"success",message:"User created successfully", token})
    
}


const login = async (req,res)=>{
    const {email,password} = req.body

    const user = await prisma.user.findUnique({
        where:{
            email: email,
        }
    })

    if(!user){
        return res.status(400).json({message:"User Doesnt existts. Please register first"})
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"})
    }

    //generate JWT token
    const token = generateToken(user.id,res)

    res.status(200).json({status:"success",message:"Login successful", token})
}


const logout = async (req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0), // Set the cookie to expire immediately
    })
    res.status(200).json({status:"success",message:"Logged Out successfully"})

}

export {register, login, logout}