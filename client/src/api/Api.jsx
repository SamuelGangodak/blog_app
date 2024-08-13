import axios from 'axios';

const apiURL= 'https://blog-app-1v2m.onrender.com';

export const getBlogs = (cat)=>{
    if(!cat) {
        cat='all';
    }
    return axios.get(apiURL+'/blog/'+cat)
    .then(result=>{
        return result.data;
    })
    .catch(error=>{
        return error;
    });
}

export const getBlogbyid=(id)=>{
    return axios.get(apiURL+'/blog/id/'+id)
    .then(result=>{
        return result.data;
    })
    .catch(error=>{
        return error;
    });
}

export const createBlog=(data)=>{
    return axios.post(apiURL+'/blog',data)
    .then(result=>{
        return result.data;
    })
    .catch(error=>{
        return error;
    });
}

export const uploadFile=(file)=>{
    const formdata = new FormData();
    formdata.append('file', file);
    const config={
        headers:{
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(apiURL+'/blogimage', formdata, config)
    .then(result=>{
        return result.data;
    })
    .catch(error=>{
        console.error(error); 
        return error;
    });
}

export const updateBlogbyid = (id, updatedBlogData) => {
    return axios.put(`${apiURL}/blog/id/${id}`, updatedBlogData)
      .then(response => {
        console.log('Blog updated successfully:', response.data);
        return response.data; 
      })
      .catch(error => {
        console.error('Error updating blog:', error);
        throw error; 
      });
}

export const deleteBlogbyid=(id)=>{
    return axios.delete(apiURL+'/blog/id/'+id)
    .then(response => {
        console.log('blog deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
}