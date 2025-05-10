/**
 * Service to handle text transformation based on personas
 */

// Import personas
const shakespeare = require('../data/personas/shakespeare');
const yoda = require('../data/personas/yoda');
const musk = require('../data/personas/musk');
const sherlock = require('../data/personas/sherlock');

// Optional: If using db, import the inMemoryStore
const inMemoryStore = require('../config/db');

/**
 * Get available personas with examples
 * @returns {Array} - List of personas with info and examples
 */
const getPersonas = () => {
  return [
    shakespeare.info,
    yoda.info,
    musk.info,
    sherlock.info
  ];
};

/**
 * Transform a message using the specified persona
 * @param {string} message - Original message
 * @param {string} personaName - Name of the persona to use
 * @returns {Object} - Result with original and transformed messages
 * @throws {Error} - If persona not found
 */
const transformMessage = (message, personaName) => {
  // Normalize persona name for comparison
  const normalizedPersonaName = personaName.toLowerCase();
  
  // Select transformer based on persona name
  let transformer;
  let personaDisplayName;
  
  switch (normalizedPersonaName) {
    case 'shakespeare':
      transformer = shakespeare.transform;
      personaDisplayName = shakespeare.info.name;
      break;
    case 'yoda':
      transformer = yoda.transform;
      personaDisplayName = yoda.info.name;
      break;
    case 'musk':
    case 'elon':
    case 'elonmusk':
      transformer = musk.transform;
      personaDisplayName = musk.info.name;
      break;
    case 'sherlock':
    case 'holmes':
    case 'sherlockholmes':
      transformer = sherlock.transform;
      personaDisplayName = sherlock.info.name;
      break;
    default:
      throw new Error(`Persona "${personaName}" not found`);
  }
  
  // Transform the message
  const transformedMessage = transformer(message);
  
  // Optional: Log transformation to in-memory store or database
  inMemoryStore.transformations.push({
    timestamp: new Date(),
    originalMessage: message,
    transformedMessage,
    persona: personaDisplayName
  });
  
  // Limit the size of the in-memory store
  if (inMemoryStore.transformations.length > 100) {
    inMemoryStore.transformations.shift();
  }
  
  return {
    original: message,
    transformed: transformedMessage,
    persona: personaDisplayName
  };
};

/**
 * Get transformation history
 * @param {number} limit - Maximum number of transformations to return
 * @returns {Array} - Recent transformations
 */
const getHistory = (limit = 10) => {
  return inMemoryStore.transformations
    .slice(-limit)
    .reverse(); // Most recent first
};

module.exports = {
  getPersonas,
  transformMessage,
  getHistory
};