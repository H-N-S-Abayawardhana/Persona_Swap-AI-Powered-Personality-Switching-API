const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const personaRoutes = require('./routes/personaRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize app
const app = express();

// Set view engine if using dashboard
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body
app.use(morgan('dev')); // Logging

// Routes
app.use('/api', personaRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to PersonaSwap API',
    endpoints: {
      getPersonas: 'GET /api/personas',
      transformMessage: 'POST /api/transform'
    }
  });
});

// Optional: Dashboard route
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Export app for testing (if needed)
module.exports = app;