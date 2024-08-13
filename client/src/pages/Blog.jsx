import { useState, useEffect } from 'react';
import { getBlogbyid } from '../api/Api';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import dateFormat from "dateformat";

const Blog = () => {

  let { id } = useParams();
  const [blog, setBlog] = useState(null);
  const apiURL = 'https://blog-app-1v2m.onrender.com/';
  
  useEffect(() => {
    async function fetchData() {
      const currentBlog = await getBlogbyid(id);
      setBlog(currentBlog.data[0]);
    }
    fetchData();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col sm:w-[60%] overflow-hidden">
        <h1 className='mt-1 text-3xl font-extrabold'>{blog.title}</h1>
        <div className="flex mt-4 mb-4">
          <small>{dateFormat(blog.createdon)}</small>
        </div>
        <img className="rounded-lg" src={apiURL + blog.image} alt="" />
        <div className='pt-4'>
          {parse(blog.post)}
        </div>
      </div>
    </div>
  );
}

export default Blog;