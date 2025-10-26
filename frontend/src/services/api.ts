import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - her request'e token ekle
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Token varsa header'a ekle
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hatalarını yakala
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersizse logout yap
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data.data;
  },
  
  getById: async (id: number | string) => {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  },
  
  create: async (userData: { 
    name: string; 
    username: string;
    email: string; 
    password: string;
    role?: string;
  }) => {
    const response = await api.post('/users', userData);
    return response.data.data;
  },
  
  update: async (id: number | string, userData: { 
    name?: string; 
    username?: string;
    email?: string;
  }) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data.data;
  },
  
  delete: async (id: number | string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// Post API
export const postAPI = {
  getAll: async () => {
    const response = await api.get('/posts');
    return response.data.data;
  },
  
  getByUserId: async (userId: number | string) => {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data.data;
  },
  
  getById: async (id: number | string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data.data;
  },
  
  create: async (postData: { 
    title: string; 
    body: string;      
    userId?: number;
  }) => {
    const response = await api.post('/posts', postData);
    return response.data.data;
  },
  
  update: async (id: number | string, postData: { 
    title?: string; 
    body?: string;   
    userId?: number;
  }) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data.data;
  },
  
  delete: async (id: number | string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  }
};

// Auth API
export const authAPI = {
  register: async (userData: { 
    name: string;
    username: string;
    email: string; 
    password: string;
    role?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: { 
    email: string; 
    password: string;
  }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};