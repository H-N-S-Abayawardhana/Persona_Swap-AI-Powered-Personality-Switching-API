/**
 * Shakespeare Persona Transformation
 */

const info = {
  name: 'Shakespeare',
  description: 'Transforms text into Shakespearean English',
  examples: [
    {
      original: 'Hello, how are you today?',
      transformed: 'Hark! How dost thou fare on this fine day?'
    }
  ]
};

/**
 * Transform message into Shakespearean English
 * @param {string} message - The original message to transform
 * @returns {string} - The transformed message
 */
function transform(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  // Common word replacements
  const replacements = {
    'you': 'thou',
    'your': 'thy',
    'yours': 'thine',
    'are': 'art',
    'is': 'doth be',
    'am': 'be',
    'my': 'mine',
    'hello': 'hark',
    'hi': 'good morrow',
    'friend': 'gentle companion',
    'friends': 'gentle companions',
    'thanks': 'many thanks',
    'thank you': 'I thank thee',
    'goodbye': 'fare thee well',
    'bye': 'adieu',
    'really': 'verily',
    'very': 'most',
    'happy': 'merry',
    'sad': 'woeful',
    'person': 'fellow',
    'people': 'folk',
    'know': 'knoweth',
    'think': 'thinketh',
    'speak': 'speaketh',
    'love': 'adore',
    'yes': 'aye',
    'no': 'nay'
  };

  // Replace common words
  let result = message.toLowerCase();
  
  for (const [original, replacement] of Object.entries(replacements)) {
    // Use word boundary regex to avoid replacing parts of words
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    result = result.replace(regex, replacement);
  }

  // Add Shakespearean suffixes for verbs
  result = result
    .replace(/\b(\w+)s\b/g, '$1eth')  // transforms -> transformeth
    .replace(/\b(\w+)ed\b/g, '$1'd'); // walked -> walk'd

  // Add interjections and phrases
  const hasQuestion = message.includes('?');
  const hasExclamation = message.includes('!');
  
  if (hasQuestion) {
    // For questions, add a Shakespearean question prefix
    const questionPrefixes = [
      'Pray tell, ',
      'I beseech thee, ',
      'Prithee, ',
      'Wouldst thou tell me, '
    ];
    const randomPrefix = questionPrefixes[Math.floor(Math.random() * questionPrefixes.length)];
    
    if (result[0] === result[0].toLowerCase()) {
      // Only add prefix if the message doesn't already start with a capital letter
      result = randomPrefix + result;
    }
  } else if (hasExclamation) {
    // For exclamations, add a Shakespearean exclamation
    const exclamations = [
      'Zounds! ',
      'Forsooth! ',
      'By my troth! ',
      'Odds bodkins! '
    ];
    const randomExclamation = exclamations[Math.floor(Math.random() * exclamations.length)];
    
    if (result[0] === result[0].toLowerCase()) {
      result = randomExclamation + result;
    }
  } else {
    // For statements, sometimes add a phrase
    const phrases = [
      'Verily, ',
      'In sooth, ',
      'Indeed, ',
      'As I live and breathe, ',
      ''  // Empty string means no phrase is added
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    if (result[0] === result[0].toLowerCase() && randomPhrase !== '') {
      result = randomPhrase + result;
    }
  }

  // Capitalize the first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Add ending flourish occasionally
  const endings = [
    ', I say!',
    ', good fellow!',
    ', forsooth!',
    '.',
    '.',  // Duplicated to reduce chance of adding an ending
    '.'   // Duplicated to reduce chance of adding an ending
  ];
  
  // Only add an ending if the message doesn't already end with punctuation
  if (!/[.!?]$/.test(result)) {
    const randomEnding = endings[Math.floor(Math.random() * endings.length)];
    result += randomEnding;
  }

  return result;
}

module.exports = {
  info,
  transform
};