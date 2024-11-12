//import{getSession} from "next-auth/react";
import { getPost, getOnepost, createpost, delOnepost, updatestatus } from "../../lib/db";

export default async function handler(req, res) {
    //const session =await getSession({req});
    //if(!session) return res.status(401).json({error:"Unauthorized"});

    switch (req.method) {
        //get a requested post by id
        case "GET":
            if (req.query.id) {
                const post = await getOnepost(req.query.id);
                if (!post) return res.status(404).json({ error: "No post found" });
                res.json(post)
            } else {
                //get all the posts
                const posts = await getPost();
                console.log(posts)
                if (!posts || posts.length === 0) {
                    return res.status(404).json({ error: "No posts available" });
                }
                res.json(posts);

            }
            break;

        //create a new post
        case "POST":
            //if(session.user.role !=="user") return res.status(403).json({error:"Forbidden"});
            const { title, content, authorId } = req.body;
            const postId = await createpost(title, content, authorId);
            res.status(201).json({ message: "Post created!", postId });
            break;

        //delete a post
        case "DELETE":
            //if(session.user.role !=="admin") return res.status(403).json({error:"Forbidden"});
            const postdelete = req.body.id;
            await delOnepost(postdelete);
            res.status(201).json({ message: "Post deleted!" });
            break;

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
