import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import BlogCard from '../components/BlogCard'
import { deleteBlogbyid, getBlogs } from '../api/Api'


const Home = () => {

  let [searchParams] = useSearchParams();

  const [blogs, setBlogs] = useState(null);

  useEffect(()=>{
    async function fetchData(){
      const allBlogs=await getBlogs();
      setBlogs(allBlogs.data);
    }
    fetchData();
  }, [])

  useEffect(()=>{
    async function fetchData(){
      let category=searchParams.get('category');
      const allBlogs=await getBlogs(category);
      setBlogs(allBlogs.data);
    }
    fetchData();
  }, [searchParams])

  async function deleteBlog(id) {
    try {
      await deleteBlogbyid(id);
      alert("Blog deleted successfully");
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {
          blogs && blogs.map((x, index)=>{
            return (<BlogCard key={index} blogdata={x} deleteBlog={deleteBlog}/>);
          })
        }
      </div>
    </div>
  )
}

export default Home