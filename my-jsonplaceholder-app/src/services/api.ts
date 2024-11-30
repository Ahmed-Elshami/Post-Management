import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,  
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const addPost = async (post: { title: string; body: string }) => {
  try {
    const response = await api.post('/posts', post);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add post');
  }
};

export default api;
