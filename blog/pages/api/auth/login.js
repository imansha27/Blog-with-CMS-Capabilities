import connectdata from "../../../lib/db.js";  

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, username } = req.body;
    console.log(req.body);

    if (!email || !username) {
        return res.status(400).json({ message: 'Both Email and username are required' });
    }

    try {
        // Connect to the database
        const db = await connectdata();

        // Query the database to find the user by email
        const userQuery = await db.get("SELECT * FROM users WHERE email = ?", [email]);
        console.log(userQuery);

        // Check if the user exists and the username matches
        if (userQuery) {
            if (userQuery.name === username) {
                // If both email and username match, send success response with user data
                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    user: userQuery  // Return all user details
                });
            } else {
                // Username does not match
                return res.status(409).json({
                    success: false,
                    message: "Invalid username"
                });
            }
        } else {
            // User not found by email
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
