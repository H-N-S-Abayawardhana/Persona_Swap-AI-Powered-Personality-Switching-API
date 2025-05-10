/**
 * Yoda Persona Transformation
 */

const info = {
  name: 'Yoda',
  description: 'Transforms text to sound like the wise Jedi Master Yoda',
  examples: [
    {
      original: 'I need to learn more about the Force.',
      transformed: 'Learn more about the Force, I need to.'
    }
  ]
};

/**
 * Transform message into Yoda style
 * @param {string} message - The original message to transform
 * @returns {string} - The transformed message in Yoda's style
 */
function transform(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  // First, let's separate punctuation from the end of the message
  let punctuation = '';
  let trimmedMessage = message;

  const endPunctuation = message.match(/[.!?]+$/);
  if (endPunctuation) {
    punctuation = endPunctuation[0];
    trimmedMessage = message.slice(0, message.length - punctuation.length);
  }
  
  // Split the message into sentences
  const sentences = trimmedMessage.split(/(?<=[.!?])\s+/);
  const transformedSentences = sentences.map(sentence => {
    // Clean any remaining punctuation for processing
    let sentencePunctuation = '';
    let cleanSentence = sentence;
    
    const sentenceEndPunct = sentence.match(/[.!?]+$/);
    if (sentenceEndPunct) {
      sentencePunctuation = sentenceEndPunct[0];
      cleanSentence = sentence.slice(0, sentence.length - sentencePunctuation.length);
    }
    
    // Simple Yoda transformation: move the subject and verb to the end
    // This won't work for all sentence structures but gives a good approximation
    if (cleanSentence.includes(',')) {
      // If there's a comma-separated clause, we can do some manipulation
      const parts = cleanSentence.split(',');
      return parts.slice(1).join(',').trim() + ', ' + parts[0].trim() + sentencePunctuation;
    } else {
      // Simple case: Split into parts and rearrange
      const parts = cleanSentence.split(' ');
      
      if (parts.length > 3) {
        // For longer sentences, try to identify a natural break point
        const middleIndex = Math.floor(parts.length / 2);
        const firstHalf = parts.slice(0, middleIndex).join(' ');
        const secondHalf = parts.slice(middleIndex).join(' ');
        return secondHalf + ', ' + firstHalf + sentencePunctuation;
      } else if (parts.length >= 2) {
        // Simple inversion for short sentences
        const firstPart = parts.slice(0, Math.ceil(parts.length / 2)).join(' ');
        const secondPart = parts.slice(Math.ceil(parts.length / 2)).join(' ');
        return secondPart + ', ' + firstPart + sentencePunctuation;
      }
      
      // If it's just one word, return it as is
      return cleanSentence + sentencePunctuation;
    }
  });
  
  // Join transformed sentences
  let result = transformedSentences.join(' ');
  
  // Yoda's vocabulary replacements
  const replacements = {
    'I': 'I',  // No change but included for potential future modifications
    'my': 'my',
    'am': 'am',
    'will': 'will',
    'have to': 'must',
    'need to': 'must',
    'there is': 'there is',
    'it is': 'it is',
    'that is': 'that is'
  };
  
  // Apply word replacements
  for (const [original, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    result = result.replace(regex, replacement);
  }
  
  // Add Yoda's phrases at the beginning or end (30% chance)
  if (Math.random() < 0.3) {
    const yodaPhrases = [
      'Hmm, ',
      'Yes, hmm. ',
      'Yeesssssss. ',
      '',  // Empty for variety
    ];
    
    const randomPhrase = yodaPhrases[Math.floor(Math.random() * yodaPhrases.length)];
    result = randomPhrase + result;
  }
  
  // Add Yoda's particles at the end (20% chance)
  if (Math.random() < 0.2) {
    const yodaParticles = [
      ' Yes.',
      ' Hmm.',
      ' I sense much fear in you.',
      ' The Force is strong with this one.',
      ' Meditate on this, I will.'
    ];
    
    // If message doesn't end with punctuation, add it
    if (!/[.!?]$/.test(result)) {
      result += '.';
    }
    
    const randomParticle = yodaParticles[Math.floor(Math.random() * yodaParticles.length)];
    result += randomParticle;
  }
  
  // Add final punctuation back
  if (punctuation && !result.endsWith(punctuation)) {
    result += punctuation;
  }
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  return result;
}

module.exports = {
  info,
  transform
};