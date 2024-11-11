import { getAllUsers } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const users = await getAllUsers();

    // Validate the users data before sending the response
    if (!Array.isArray(users)) {
      return res.status(500).json({ message: 'Invalid user data' });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}
