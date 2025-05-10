/**
 * Controller for persona-related routes
 */

const transformerService = require('../services/transformerService');
const responseFormatter = require('../utils/responseFormatter');

/**
 * Get list of available personas
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getPersonas = (req, res, next) => {
  try {
    const personas = transformerService.getPersonas();
    res.json(responseFormatter.success(personas, 'Available personas retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * Transform a message using specified persona
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const transformMessage = (req, res, next) => {
  try {
    const { message, persona } = req.body;
    
    // Validate required fields
    if (!message) {
      return res.status(400).json(
        responseFormatter.error('Message is required', 400)
      );
    }
    
    if (!persona) {
      return res.status(400).json(
        responseFormatter.error('Persona is required', 400)
      );
    }
    
    const result = transformerService.transformMessage(message, persona);
    res.json(responseFormatter.success(result, 'Message transformed successfully'));
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json(
        responseFormatter.error(error.message, 404)
      );
    }
    next(error);
  }
};

/**
 * Get transformation history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getHistory = (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const history = transformerService.getHistory(limit);
    res.json(responseFormatter.success(history, 'Transformation history retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

/**
 * Render dashboard view (if using views)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const renderDashboard = (req, res, next) => {
  try {
    const personas = transformerService.getPersonas();
    const history = transformerService.getHistory(5);
    
    res.render('dashboard', {
      personas,
      history,
      title: 'PersonaSwap Dashboard'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPersonas,
  transformMessage,
  getHistory,
  renderDashboard
};