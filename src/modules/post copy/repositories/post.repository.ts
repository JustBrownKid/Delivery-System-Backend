import { Post } from "../entities/post.entity";

export interface PostRepository {
    getAll(): Promise<Post[]>;
    getById(id:number): Promise<Post | null>;
    create(post : Omit<Post ,'id'>): Promise<Post>;
    update(id: number, data: Partial<Post>): Promise<Post | null>;
    delete(id: number): Promise<void>;
}
