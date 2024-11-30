import React, { useEffect, useState } from 'react';
import { Layout, Button, notification } from 'antd';
import PostForm from './components/PostForm';
import PostTable from './components/PostTable';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const saveToLocalStorage = (posts: any[]) => {
    localStorage.setItem('posts', JSON.stringify(posts));
    setPosts(posts);
  };

  const fetchPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = (newPost: any) => {
    const newId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
    const postWithId = { ...newPost, id: newId };
    const updatedPosts = [...posts, postWithId];
    saveToLocalStorage(updatedPosts);
    setShowForm(false);
    notification.success({
      message: 'Post Added',
      description: `Post with ID ${newId} has been added successfully!`,
    });
  };

  const handlePostUpdated = (updatedPost: any) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    saveToLocalStorage(updatedPosts);
    setEditingPost(null);
    setShowForm(false);
    notification.success({
      message: 'Post Updated',
      description: `Post with ID ${updatedPost.id} has been updated successfully!`,
    });
  };

  const handlePostDeleted = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    saveToLocalStorage(updatedPosts);
    notification.success({
      message: 'Post Deleted',
      description: `Post with ID ${id} has been deleted successfully!`,
    });
  };

  const handleEditClick = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  return (
    <Layout>
      <Header style={{ color: '#fff', textAlign: 'center' }}>Post Management</Header>
      <Content style={{ padding: '20px' }}>
        {!showForm && (
          <Button
            type="primary"
            style={{ marginBottom: '20px' }}
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
            }}
          >
            Add New Post
          </Button>
        )}
        {showForm && (
          <PostForm
            onPostAdded={handlePostAdded}
            onPostUpdated={handlePostUpdated}
            editingPost={editingPost}
          />
        )}
        <PostTable posts={posts} onEdit={handleEditClick} onDelete={handlePostDeleted} />
      </Content>
    </Layout>
  );
};

export default App;
