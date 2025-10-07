require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Test route
app.get('/api/test', (req, res) => {
              res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
              console.log(`Server running on port ${PORT}`);
});