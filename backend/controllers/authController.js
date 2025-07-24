import generateOTP from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";

const OTP_STORE = new Map();
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5');
const USERS = new Map();




export const sendOTP = (req,res)=>{
    const {phone} = req.body;
    if(!phone){
        return res.status(400).json({error:'Phone number is required'})
    }
    const otp = generateOTP();
    const expiresAt = Date.now()+ OTP_EXPIRY_MINUTES*60*1000;
    OTP_STORE.set(phone,{otp,expiresAt});
    console.log(`OTP for ${phone}is ${otp}`);
    res.json({message:'OTP sent'})
};

export const verifyOTP = (req,res)=>{
    const {phone, otp} = req.body;
    if(!phone || !otp){
        return res.status(400).json({error:'Phone and OTP are required'})
    }

    const record = OTP_STORE.get(phone);
    if(!record){
        return res.status(400).json({error:'OTP not found please request a new one'});
    }

    if(Date.now()>record.expiresAt){
        OTP_STORE.delete(phone);
        return res.status(400).json({error:'OTP expired'})
    }

    if(record.otp !==otp){
        return res.status(400).json({error:'Invalid OTP'})
    }
    OTP_STORE.delete(phone);

    if(!USERS.has(phone)){
        USERS.set(phone,{phone,createdAT:new Date()});
    }

    const user = USERS.get(phone);
    const token =jwt.sign({phone:user.phone},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({token,user});
}