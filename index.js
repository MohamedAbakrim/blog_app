import express from 'express';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import router from './routes/blogRoutes.js';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();


//connect to mongodb
const dbURI = "mongodb+srv://abakrim:typingclub@nodejs.ukypttu.mongodb.net/NodeJs?retryWrites=true&w=majority"
mongoose.connect(dbURI)
	.then((res)=>app.listen(3000))
	.catch((err)=>console.log(err));


// register view engine

app.set('view engine', 'ejs'); 
app.set('views', 'views');


//middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


// app.use((req, res, next)=>{
// 	console.log('new request made :');
// 	console.log('host : ', req.hostname);
// 	console.log('path : ', req.path);
// 	console.log('method', req.method);
// 	next();
// });

app.use(morgan('dev'));



// mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res)=>{
// 	const blog = new Blog({
// 		title:'new Blog',
// 		snippet:'about my new blog',
// 		body:'more about my new blog'
// 	});

// 	blog.save()
// 		.then((result)=>{
// 			res.send(result);
// 		})
// 		.catch((err)=>{
// 			console.log(err);
// 		});	
// })  this route is just a test to insert the first document to the database from the backend server


// app.get('/all-blogs', (req, res)=>{
// 	Blog.find()
// 		.then((result)=>{
// 			res.send(result);
// 		})
// 		.catch((e)=>{
// 			console.log(e)
// 		});
// });

// app.get('/single-blog', (req, res)=>{
// 	Blog.findById('643fc38402ab2e18b643fa09')
// 		.then((result)=>{
// 			res.send(result);
// 		})
// 		.catch((err)=>{
// 			console.log(err); 
// 		})
// })



app.get('/', (req, res)=>{
	res.redirect('/blogs');
	// const blogs = [
	// 	{title:'title1', snippet :'Sinppet 1 Snippet 1 Sinppet 1'},
	// 	{title:'title2', snippet :'Sinppet 2 Snippet 2 Sinppet 2'},
	// 	{title:'title3', snippet :'Sinppet 3 Snippet 3 Sinppet 3'}
	// ];
	// // res.send('<p>home page</p>')
	// // res.sendFile('./views/index.html', {root:__dirname});
	// res.render('index', {title:'Home', blogs});
});
app.get('/about', (req, res)=>{
	res.render('about', {title:'About'});
	// res.sendFile('./views/about.html', {root:__dirname});
});

// blog routes
app.use('/blogs', router);

router.get('/about-us', (req, res)=>{
	res.redirect('/about');
});

app.use((req, res)=>{
	res.status(404).render('404', {title:'404'})
	// res.status(404).sendFile('./views/404.html', {root:__dirname});
})