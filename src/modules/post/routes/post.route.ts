import { Router } from "express";
import postController from "../controllers/post.controller"
import { validate } from '../../../common/utils/middleware/vaildation.middleware';
import { createPostSchema, updatePostSchema } from '../validation/post.validation';


const router = Router();

router.get('/' , postController.getAllPost)
router.get('/:id' , postController.getPostById)
router.post(
    '/',
    validate(createPostSchema), 
    postController.createPost
);
router.put(
    '/:id',
    validate(updatePostSchema),
    postController.updatePost
);
router.delete('/:id' , postController.deltePost)

export default router;