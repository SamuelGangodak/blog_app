import {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog, updateBlogbyid, uploadFile } from '../api/Api';
import { useLocation } from 'react-router-dom';


const CreateBlog = (prop) => {

  const location = useLocation();
  const data = location.state;

  const blankBlog={
    "title": data.title,
    "image": data.image,
    "post": data.post,
    "category": data.category
  }

  const [newBlog, setNewBlog] = useState(blankBlog);

  const menu=[
      {text: "Nature", path: "/"},
      {text: "Technology", path: "/"},
      {text: "Travel", path: "/"},
      {text: "Politics", path: "/"}
  ]

  function handleChange(event) {
    const {name, value} = event.target;
    setNewBlog({...newBlog, [name]: value});
  }

  async function handleUpload(event) {
    let uploadedFile=await uploadFile(event.target.files[0]);
    if(uploadedFile.path) {
      setNewBlog({...newBlog, image: uploadedFile.path});
    } else {
      console.log("Cannot find path");
    }
  }

  async function handleSubmit() {
    let createdBlog;
    if(prop.create) {
      createdBlog=await createBlog(newBlog);
    } else {
      createdBlog=await updateBlogbyid(data._id, newBlog);
    }
    if(createdBlog.desc == 1) {
      setNewBlog(blankBlog);
      if(prop.create) {
        alert("Blog added succcessfully");
      } else {
        alert("Blog updated succcessfully");
      }
      
    }
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className="bg-slate-200 w-[80%] sm:w-[60%] p-5 rounded-xl">
        <h1 className='text-2xl mb-5'>Create Blog Post</h1>
        <div className="flex flex-col">
            <label htmlFor="" className='ml-1 text-gray-500'>Title</label>
            <input type="text" name="title" value={newBlog.title} onChange={handleChange} className='h-10 border border-gray-300 rounded my-5 p-2' />
            <label htmlFor="" className='ml-1 text-gray-500'>Category</label>
            <select name="category" value={newBlog.category} onChange={handleChange} id="" className='h-10 border border-gray-300 rounded my-5 p-2'>
                <option value="" default disabled>Select Category</option>
                {menu.map((opt)=>{
                    return <option key={opt.text} value={opt.text}>{opt.text}</option>
                })
                }
            </select>
            <label htmlFor="" className='ml-1 text-gray-500'>Image</label>
            <input type='file' onChange={handleUpload} className=' border-gray-300 rounded my-5 p-2' />
            <label htmlFor="" className='ml-1 text-gray-500'>Post</label>
            <ReactQuill className='bg-white rounded my-2 editingarea' theme="snow" name="post" value={newBlog.post} onChange={e=>{setNewBlog({...newBlog, post:e})}} />

            <hr/>
            <button onClick={handleSubmit} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
