import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    res.json({message:"I am get"})
})

router.post("/",(req,res)=>{
    res.json({message:"I am post"})
})

export default router;