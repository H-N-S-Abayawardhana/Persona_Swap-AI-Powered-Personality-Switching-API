/**
 * Yoda Persona Transformation
 */

const info = {
  name: 'Yoda',
  description: 'Transforms text to sound like Jedi Master Yoda',
  examples: [
    {
      original: 'I am going to the store.',
      transformed: 'To the store, going I am, hmm.'
    }
  ]
};

/**
 * Split a sentence into its constituent parts
 * @param {string} sentence - Sentence to split
 * @returns {Object} - Object containing different parts of the sentence
 */
function parseSentence(sentence) {
  // Simple sentence parsing - not comprehensive but works for basic sentences
  // Looking for pattern: [subject] [verb] [object/predicate]
  
  // Strip punctuation for processing
  const plainSentence = sentence.replace(/[.,!?;]$/g, '').trim();
  
  // Simple patterns to detect
  const patterns = [
    // "I am happy" -> ["I", "am happy"]
    { regex: /^(I|you|we|they|he|she|it|[A-Z][a-z]+) (am|are|is|was|were|have|has|had|will|would|can|could|may|might|shall|should|must)(.+)$/i, 
      parts: (matches) => ({ subject: matches[1], verb: matches[2], predicate: matches[3].trim() }) },
    
    // "I like pizza" -> ["I", "like", "pizza"]
    { regex: /^(I|you|we|they|he|she|it|[A-Z][a-z]+) ([a-z]+)(.+)$/i,
      parts: (matches) => ({ subject: matches[1], verb: matches[2], predicate: matches[3].trim() }) },
      
    // Default case - split into thirds if possible
    { regex: /^(.+)$/,
      parts: (matches) => {
        const words = matches[1].split(' ');
        if (words.length >= 3) {
          const third = Math.floor(words.length / 3);
          return {
            subject: words.slice(0, third).join(' '),
            verb: words.slice(third, third * 2).join(' '),
            predicate: words.slice(third * 2).join(' ')
          };
        } else if (words.length === 2) {
          return {
            subject: words[0],
            verb: '',
            predicate: words[1]
          };
        } else {
          return {
            subject: matches[1],
            verb: '',
            predicate: ''
          };
        }
      }
    }
  ];
  
  // Try each pattern
  for (const pattern of patterns) {
    const matches = plainSentence.match(pattern.regex);
    if (matches) {
      return pattern.parts(matches);
    }
  }
  
  // Fallback
  return { 
    subject: plainSentence,
    verb: '',
    predicate: ''
  };
}

/**
 * Get the ending punctuation of a sentence
 * @param {string} sentence - The sentence
 * @returns {string} - The ending punctuation
 */
function getEndingPunctuation(sentence) {
  const match = sentence.match(/([.,!?;]+)$/);
  return match ? match[1] : '.';
}

/**
 * Transform message into Yoda speak
 * @param {string} message - The original message to transform
 * @returns {string} - The transformed message in Yoda's style
 */
function transform(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }
  
  // Split the message into sentences
  const sentences = message.match(/[^.!?;]+[.!?;]+/g) || [message];
  
  const transformedSentences = sentences.map(sentence => {
    // Get ending punctuation
    const punctuation = getEndingPunctuation(sentence);
    
    // Parse the sentence
    const parts = parseSentence(sentence);
    
    // Build Yoda-style sentence - basic pattern: [object], [subject] [verb]
    let yodaSentence = '';
    
    if (parts.predicate && parts.subject) {
      // Standard Yoda inversion
      yodaSentence = `${parts.predicate}, ${parts.subject} ${parts.verb}`;
    } else if (parts.subject.includes(' ')) {
      // If can't find clear parts but subject has multiple words, 
      // try splitting subject into parts
      const subjectWords = parts.subject.split(' ');
      const firstHalf = subjectWords.slice(0, Math.ceil(subjectWords.length / 2)).join(' ');
      const secondHalf = subjectWords.slice(Math.ceil(subjectWords.length / 2)).join(' ');
      yodaSentence = `${secondHalf}, ${firstHalf}`;
    } else {
      // Fallback - use original
      yodaSentence = parts.subject;
    }
    
    // Clean up
    yodaSentence = yodaSentence
      .replace(/\s+/g, ' ')      // Remove extra spaces
      .replace(/\s+,/g, ',')     // Remove space before comma
      .trim();
    
    // Add Yoda's characteristic expressions
    const yodaExpressions = [
      'Hmm.', 
      'Yes, hmmm.', 
      'Mmm.',
      ''  // Empty expression to reduce frequency
    ];
    
    // Add a random expression about 50% of the time
    const addExpression = Math.random() > 0.5;
    const randomExpression = yodaExpressions[Math.floor(Math.random() * yodaExpressions.length)];
    
    // Build final sentence with proper capitalization and Yoda expression
    let result = yodaSentence.charAt(0).toUpperCase() + yodaSentence.slice(1);
    
    // Add original punctuation
    if (!result.endsWith(punctuation)) {
      result += punctuation;
    }
    
    // Add Yoda expression if selected
    if (addExpression && randomExpression) {
      result += ' ' + randomExpression;
    }
    
    return result;
  });
  
  return transformedSentences.join(' ');
}

module.exports = {
  info,
  transform
};