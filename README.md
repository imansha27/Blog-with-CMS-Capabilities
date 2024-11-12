# Blog-with-CMS-Capabilities
Next.js project

# Install Dependencies and run the project

`cd blog` --> `npm install` --> `npm run dev`--> `open browser and go to http://localhost:3000`


# Technologies Used:
Next.js
SQLite
Tailwind CSS
NextAuth.js
postman
 

# File structure:
.
└── blog
    ├── app
    |   ├── globa;s.css
    |   ├──  layout.js          
    |   └── page.jsx                  //login page/starting page
    |
    ├── components                    //components of the project
    |       ├── footer.jsx 
    |       ├── header.jsx 
    |       └── post.jsx 
    |
    ├── data                         // Data directory 
    |       └── database.sqlite
    |
    ├── lib
    |   ├── db.js                    // Database functions for fetching and updating posts
    |   └── dbsetup.js               // Database setup file
    |
    ├── node_modules                 // Node.js modules for the project
    |
    ├── pages                        // Main pages directory
    |   ├── admin
    |   |   └── adashboard.jsx       // Admin dashboard page
    |   |
    |   ├── api                      // API routes directory
    |   |   ├── auth
    |   |   ├── admin.js             // Admin API route
    |   |   ├── blogpost.js          // Blog post API route
    |   |   ├── signup.js            // Signup API route
    |   |   └── users.js             // Users API route
    |   |
    |   └── user
    |       ├── Editpost
    |       |   └── [id].jsx         // Edit post page with dynamic ID
    |       |
    |       ├── readpost
    |       |   └── [id].jsx         // Read post page with dynamic ID
    |       |
    |       ├── blogpage.jsx         // Blog page displaying posts as cards
    |       ├── createpost.jsx       // Create post page
    |       ├── dashboard.jsx        // User dashboard page
    |       ├── editpage.jsx         // Edit page for posts
    |       └── signup.jsx           // Signup page
    |
    └── README.md                    // Readme file providing information about the project


