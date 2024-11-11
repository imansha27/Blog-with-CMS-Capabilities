import { usersignup } from "../../lib/db";

//create a new user

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, role } = req.body;
    if(!name|| !email){
        return res.status(400).json({message:"Both Name and email are required!"});
    }

    try {
        const userId = await usersignup(name, email, role);
        res.status(201).json({ message: "User created successfully", userId });
      
    } catch (error) {
        if(error.message === "Email already existss"){
            res.status(409).json({message:"This Email Already exsists"})
        }else{
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
       
    }
}



