import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="loading"></div>;

  if (error) return <div className="container"><div className="error-message">{error}</div></div>;

  if (!post) return <div className="container"><div className="error-message">Post not found</div></div>;

  return (
    <div className="blog-detail-container">
      <div className="card">
        <h1 className="blog-detail-title">{post.title}</h1>
        <div className="blog-detail-meta">
          By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="blog-detail-content">
          {post.content}
        </div>
      
        <div className="blog-actions">
          <Link to="/" className="btn">Back to Posts</Link>
          
          {isAdmin && (
            <>
              <Link to={`/admin/edit/${post._id}`} className="btn btn-success">Edit</Link>
              <Link to={`/admin`} className="btn btn-danger">Delete</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;