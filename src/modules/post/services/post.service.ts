import { Post } from "../entities/post.entity";
import { PostRepository } from "../repositories/post.repository";

export class PostService {
    constructor(private postRepo: PostRepository) {}

    getAllPost() {
        return this.postRepo.getAll()
    }
    getPostById(id : number){
        return this.postRepo.getById(id)
    }
    postCreate(data: Omit<Post, 'id'>){
        return this.postRepo.create(data)
    }
    postUpdate(id: number , data: Partial<Post>){
        return this.postRepo.update(id , data)
    }
    postDelete(id: number){
        return this.postRepo.delete(id)
    }
}