import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function dbsetup() {
    const db =await open({
        filename:'../data/database.sqlite',
        driver:sqlite3.Database,
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          role TEXT DEFAULT 'user',   
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);



      await db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          authorId INTEGER NOT NULL,  
          status TEXT DEFAULT 'pending',  
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (authorId) REFERENCES users(id)  
        )
      `);
      
      console.log('Database setup complete');
    }
    
    dbsetup().catch(err => {
      console.error('Error setting up database:', err);
    });
