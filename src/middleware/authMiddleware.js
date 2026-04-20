import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js"

const authMiddleware =async (req, res, next)=>{
    console.log("middleware ran")
    let token;

    if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith("bearer")){
        token = req.headers.authorization.split(" ")[1]
    }else if(req.cookies?.jwt){
        token = req.cookies.jwt
    }

    if(!token){
        return res.status(401).json({message:"Unauthorized, token missing"})
    }

    // verify the token and extract user information if needed

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })

        if(!user){
            return res.status(401).json({message:"Unauthorized, user not found"})
        }

        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler

    }catch(error){
        console.error("Token verification failed:", error)
        return res.status(401).json({message:"Unauthorized, invalid token"})
    }

}

export default authMiddleware;