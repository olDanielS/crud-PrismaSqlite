import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default {
    async createUser(req, res){
        try {
            const {name, email} = req.body;

            let user = await prisma.user.findUnique({where: {email}});

            if(user){
                return res.json({error: "User already exits"})
            }

            user = await prisma.user.create({
                data: {
                    name, 
                    email
                }
            })

            return res.json(user)
        }catch(error){
            res.json(error)
        }
    },
    async findUsers(req, res){
        try {
            const users = await prisma.user.findMany()

            res.json(users)
        }catch(error){
            	return res.json(error)
        }
    },
    async findUserByEmail(req, res){
        try {
            const { email } = req.params;

            const user = await prisma.user.findUnique({where: {email}})

            if(!user){
                res.json({error: "User not found"})
            }

            return res.json(user)
        }catch(error){
            	return res.json(error)
        }
    },
    async updateUser(req, res){
        try{
            const {email} = req.params;
            const {name, newEmail} = req.body

            let user = await prisma.user.findUnique({where: {email}});
            

            if(!user){
                return res.json({error: "User not found"})
            }

            const id = user.id;

            user = await prisma.user.update({
                where: {id: Number(id)},
                data: {
                    name,
                    email: newEmail
                }
            })
            console.log({id})
            return res.json(user)


        }catch(error){
            res.json(error)
        }
    },

    async removeUser(req, res){
        try{
            const {email} = req.params;
        
            let user = await prisma.user.findUnique({where: {email}});
            

            if(!user){
                return res.json({error: "User not found"})
            }

            const id = user.id;

            user = await prisma.user.delete({where: {id: Number(id)}})
            console.log({id})
            return res.json(user ? "User removed" : "some error ocurredy ")


        }catch(error){
            res.json(error)
        }
    }
}