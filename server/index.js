import express from "express"
import multer from "multer";
import cors from "cors"
import { blogs } from "./models/Blog.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app=express();

app.use(cors()) 

mongoose.connect(process.env.DATABASE_URL+"blog-app")

const port=process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
})
  
const upload = multer({ storage: storage })

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.get("/", (req, res)=>{
    res.json({"message":"Hello World!"});
})


app.get('/blog/:cat', async (req, res) => {
    try {
      const category = req.params.cat;
      if (!category) {
        return res.status(400).json({ message: 'Category parameter is required' });
      }
      const query = category === 'all' ? {} : { category: category };
      const result = await blogs.find(query);
      if (result.length === 0) {
        return res.status(404).json({ message: 'No blogs found for the given category' });
      }
      res.json({ data: result });
  
    } catch (error) {
      console.error('Error retrieving blogs:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.get('/blog/id/:id', async (req, res) => {
    try {
      const blogId = req.params.id;
      if (!blogId) {
        return res.status(400).json({ message: 'Blog ID is required' });
      }
      const result=await blogs.find({_id : blogId});
      if (!result) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ data: result });
  
    } catch (error) {
      console.error('Error retrieving blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/blog', async (req, res) => {
    try {
      const { title, image, post, category } = req.body;
      if (!title || !image || !post || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const result = await blogs.insertMany({ title, image, post, category });
      if (result.length === 0) {
        return res.status(500).json({ message: 'Failed to add new blog' });
      }
      res.json({ message: 'Added a new blog', desc: result.length });
  
    } catch (error) {
      console.error('Error adding new blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/blogimage', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      res.json(req.file);
    } catch (error) {
      console.error('Error processing file upload:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.delete('/blog/id/:id', async (req, res) => {
    try {
      const result = await blogs.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ data: result });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.put('/blog/id/:id', async (req, res) => {
    try {
      const updateData = req.body;
      const result = await blogs.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!result) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ data: result });
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})