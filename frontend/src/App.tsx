import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import UserList from './components/UserList';
import PostList from './components/PostList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// CSS imports
import './styles/theme.css';
import './styles/dashboard.css';
import './styles/auth.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="posts" element={<PostList />} />
          </Route>

          {/* Catch all - redirect to dashboard if authenticated, login if not */}
          <Route path="*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;