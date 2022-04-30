import { response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../prisma/client.js'


export class User {
    #id
    name
    email
    password

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }


    async create() {
        const userExists = await prisma.user.findFirst({
            where: { email: this.email }
        })

        if (userExists) return response.status(400);

        const hashPassword = await bcrypt.hash(this.password, 8);

        await prisma.user.create({
            data: {
                name: this.name,
                email: this.email,
                password: hashPassword
            }
        })

        return response.status(201);
    }

    async read(userId) {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return user;
    }

    async update(id, dataToUpdate) {
        const { name } = dataToUpdate;
        
        try {
            await prisma.user.update({
                where: { id: Number(id) },
                data: { name: name }
            });
            
            return response.status(200);
        } catch {

            return response.status(400);
        }
    }

}