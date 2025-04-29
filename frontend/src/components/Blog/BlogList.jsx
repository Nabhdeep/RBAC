import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchPosts();
  }, []);

  if (loading) return <div className="loading"></div>;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container">
      <h1 className="blog-header">Latest Blog Posts</h1>
      
      <div className="blog-list">
        {posts.length === 0 ? (
          <p>No blog posts available at the moment.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="blog-item">
              <h2 className="blog-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <div className="blog-meta">
                By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p className="blog-excerpt">
                {post.content.substring(0, 150)}...
              </p>
              <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;