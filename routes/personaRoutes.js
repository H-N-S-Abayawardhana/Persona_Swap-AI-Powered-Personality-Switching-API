/**
 * Routes for persona-related endpoints
 */

const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const rateLimiter = require('../middleware/rateLimiter');

// Get available personas
router.get('/personas', personaController.getPersonas);

// Transform message with persona (rate limited)
router.post('/transform', rateLimiter, personaController.transformMessage);

// Get transformation history
router.get('/history', personaController.getHistory);

module.exports = router;