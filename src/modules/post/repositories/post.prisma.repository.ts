import { Post } from "../entities/post.entity";
import { PostRepository } from "./post.repository";
import { prisma } from '../../../common/database/prismaClient';



type PostWithAuthorName = Post & {
    user: {
        name: string | null;
    };
};

export class PrismaPostRepository implements PostRepository {

    async getAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            include: {
                user: { 
                    select: { 
                        name: true,
                    },
                },
            },
        });;
        return posts as PostWithAuthorName[];
    }

    async getById(id: number): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                user: { 
                    select: { 
                        name: true,
                    },
                },
            },
        });
        return post as PostWithAuthorName | null;
    }

    async create(postData: Omit<Post, 'id'>): Promise<Post> {
        const newPost = await prisma.post.create({
            data: postData,
        });
        return newPost;
    }

    async update(id: number, data: Partial<Post>): Promise<Post | null> {
        try {
            const updatedPost = await prisma.post.update({
                where: { id },
                data,
            });
            return updatedPost;
        } catch (error) {
            console.error(`Error updating post with ID ${id}:`, error);
            return null;
        }
    }

    async delete(id: number): Promise<void> {
        await prisma.post.delete({
            where: { id },
        });
    }
}