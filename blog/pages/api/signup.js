import { usersignup } from "../../lib/db";

// Create a new user
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, role } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Both Name and Email are required!" });
    }

    try {
        const result = await usersignup(name, email, role);

        if (!result.success) {
            return res.status(409).json({ message: result.message }); 
        }

        return res.status(201).json({ message: "User created successfully", userId: result.userId });

    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
}
