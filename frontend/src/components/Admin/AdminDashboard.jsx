import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post._id !== id));
        setSuccessMessage('Post deleted successfully');
      } catch (err) {
        setError('Failed to delete the post');
      }
    }
  };

  if (loading) return <div className="loading"></div>;

  return (
    <div className="container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <Link to="/admin/create" className="btn">Create New Post</Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div className="card">
        <h2>Manage Blog Posts</h2>
        
        {posts.length === 0 ? (
          <p>No blog posts available.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="admin-actions">
                    <Link to={`/posts/${post._id}`} className="btn">View</Link>
                    <Link to={`/admin/edit/${post._id}`} className="btn btn-success">Edit</Link>
                    <button 
                      onClick={() => handleDelete(post._id)} 
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
