import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './layout/ProtectedRoute';
import Navbar from './layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreatePost from './components/Admin/CreatePost';
import EditPost from './components/Admin/EditPost';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<BlogPost />} />
            
            {/* Protected Routes for Admin Only */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/create" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreatePost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit/:id" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <EditPost />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};
export default App;