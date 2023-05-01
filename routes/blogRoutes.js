import express from 'express';
import { blog_create_get, blog_create_post, blog_delete, blog_details, blog_index } from '../controllers/blogController.js';


const router = express.Router();

router.get('/', (req, res)=>{
	blog_index(req, res);
})


router.get('/add', (req, res)=>{
	blog_create_get(req, res);
})

router.get('/:id', (req, res)=>{
	blog_details(req, res)
})


router.delete('/:id', (req, res)=>{
	blog_delete(req, res)
})


router.post('/', (req, res)=>{
	blog_create_post(req, res)
});

export default router;