import { AgetPost, getOnepost, updatestatus } from "../../lib/db";

export default async function handler(req, res) {
    

    switch (req.method) {
        //get a requested post by id
        case "GET":
            if (req.query.id) {
                const post = await getOnepost(req.query.id);
                if (!post) return res.status(404).json({ error: "No post found" });
                res.json(post)
            } else {
                //get all the posts
                const posts = await AgetPost();
                console.log(posts)
                if (!posts || posts.length === 0) {
                    return res.status(404).json({ error: "No posts available" });
                }
                res.json(posts);

            }
            break;

        // approve a reject a post 
        case "PUT":
            //if(session.user.role !=="admin") return res.status(403).json({error:"Forbidden"});
            const { id, status } = req.body;
            await updatestatus(id, status);
            res.status(201).json({ message: "Status updated!" });
            break;

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
