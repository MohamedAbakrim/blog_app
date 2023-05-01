// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

import Blog from './../models/blog.js';

export const blog_index = (req, res)=>{
    Blog.find().sort({createdAt:-1})
		.then((result)=>{
			res.render('blogs/index', {title:'All Blogs', blogs:result})
		})
		.catch((err)=>{
			console.log(err);
		});
}

export const blog_details = (req, res)=>{
    const id = req.params.id
	Blog.findById(id)
		.then((result)=>{
			res.render('blogs/details', {blog:result, title:'Blog details'})
		})
		.catch((err)=>{
			res.status(404).render('404', {title:'Blog not found'});
		})
}

export const blog_create_get = (req, res)=>{
    res.render('blogs/add', {title:'Create a new Blog'});
}

export const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
	console.log(blog);
	blog.save()
		.then((result)=>{
			res.redirect('/blogs')
		})
		.catch((err)=>{
			console.log(err);
		})
}

export const blog_delete = (req, res)=>{
    const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((t)=>{
			res.json({redirect: '/blogs'})
		})
		.catch((err)=>{
			console.log(err);
		});
}