import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

const connectdata = async () => {
  if (db) return db;

  db = await open({
    filename: './data/database.sqlite',
    driver: sqlite3.Database,
  });
  return db;
};

export default connectdata;


// Create a new user
export const usersignup = async (name, email, role = 'user') => {
    const db = await connectdata();

    try {
      const existinguser = await db.get(`SELECT * FROM users WHERE email=?`,[email]);
    if(existinguser){
        return ({
            success: false,
            message: "Email Already exsists!"
        });
    }
    const result = await db.run(
        `INSERT INTO users (name, email, role) VALUES (?, ?, ?)`,
        [name, email, role] 
    );
    return {
        success: true,
        userId: result.lastID,
    };

    } 
    
    catch (error) {
        console.error("Error inserting user:", error);
        throw error; 
    } 
};




//get all posts

export const getPost = async () =>{
    const db = await connectdata();
    const posts = await db.all(`SELECT 
        posts.id,
        posts.title,
        user.username
        FROM posts
        JOIN users ON posts.authotId = users.id
        WHERE posts.status ="approved"
        ORDER BY posts.created_at DESC`);

        return posts.rows;
};

//get one post

export const getOnepost = async (id) => {
    const db = await connectdata();
    const post = await db.get(`SELECT
        * FROM posts WHERE id =?, id`);
    return post;
};


//create a new post

export const createpost = async(title,content,authorId, status = 'pending') =>{
    const db =await connectdata();
    const result =await db.run(
        `INSERT INTO post (title,content,authorId,status)
        VALUES(?,?,?,?,?)`
        ,title,content,authorId,status
    );
    return result.lastID;
};



//delete a post

export const delOnepost = async (id) => {
    const db = await connectdata();
    await db.run (`DELETE
        FROM posts WHERE id =?, id`);
 
};



// update post status

export const updatestatus=async(id,status)=>{
    const db =await connectdata();
    await db.run(`UPDATE post SET status =? WHERE id=?`, status,id);
};


// Function to get all users
export const getAllUsers = async () => {
    const db = await connectdata();
    const users = await db.all('SELECT * FROM users');  
    console.log(users)
    return users;
};
