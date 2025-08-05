import { PostService } from "../services/post.service";

import { PrismaPostRepository } from "../repositories/post.prisma.repository";
import { Request , Response } from "express";

const postService = new PostService(new PrismaPostRepository());

export default  {
    async getAllPost(req:Request , res:Response){
        const post = await postService.getAllPost();
        res.json(post);
    },
    async getPostById(req:Request , res:Response){
        const id = parseInt(req.params.id, 10);
        const post = await postService.getPostById(id)
        if (post) {  
        res.json(post) ;
        }else{
         res.status(404).json({ message: 'Post not found' }) 
        }
    },
    async createPost(req:Request , res:Response){
        const post = await postService.postCreate(req.body);
        res.json(post)
    },
    async  updatePost(req:Request , res:Response){
        const id = parseInt(req.params.id , 10)
        const post = await postService.postUpdate(id , req.body)
        post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
    },
    async  deltePost(req:Request , res:Response){
        const id = parseInt(req.params.id , 10)
        const post = await postService.postDelete(id)
        res.status(200).json({ message: "Post delete success" });
    }
};
