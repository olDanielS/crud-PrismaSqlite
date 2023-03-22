import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();


export default {
    async createPost(req, res){
        const {email} = req.params;
        const {content} = req.body;

        let user = await prisma.user.findUnique({where: {email}});

        if(!user){
            return res.json({error: "User not found"})
        }

        const {id} = user;
        user = await prisma.post.create({
            data: {
                content,
                userId: id
            },
            include: {
                author: true
            }
        })
        return res.json(user)
    },
    async findAllPosts(req, res){
        try{
            const posts = await prisma.post.findMany();
            if(!posts){
                return res.json({error: "No post found"})
            }
            return res.json(posts)
        }catch(error){
            return res.json(error)
        } 
    },
    async updatePost(req, res){
        try{
            const {id} = req.params;
            const {content} = req.body;

            let post = await prisma.post.findUnique({where: {id : Number(id)}});

            if(!post){
                return res.json({error: "Post not found"})
            }
            
            post = await prisma.post.update({
                where: {id: Number(id)},
                data: {content}
            })

            return res.json({"message": "Post has updated"})

        }catch(error){
            return res.json(error)
        } 
    },
}