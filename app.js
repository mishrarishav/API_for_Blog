const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary data for our blog posts
let blogPosts = [
  { id: 1, title: 'First Post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Second Post', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 3, title: 'Third Post', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
];

// Route for creating a new blog post
app.post('/posts', (req, res) => {
  const newPost = {
    id: blogPosts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  blogPosts.push(newPost);
  res.json(newPost);
});

// Route for listing all blog posts (paginated)
app.get('/posts', (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const posts = blogPosts.slice(startIndex, endIndex);
  res.json(posts);
});

// Route for getting details of a specific blog post
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === postId);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
  } else {
    res.json(post);
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
