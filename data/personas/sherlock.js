/**
 * Sherlock Holmes Persona Transformation
 */

const info = {
  name: 'Sherlock Holmes',
  description: 'Transforms text to sound like the famous detective Sherlock Holmes',
  examples: [
    {
      original: 'I think we should investigate this further.',
      transformed: 'I deduce we must investigate this matter further, Watson. The evidence demands it!'
    }
  ]
};

/**
 * Transform message into Sherlock Holmes style
 * @param {string} message - The original message to transform
 * @returns {string} - The transformed message in Sherlock's style
 */
function transform(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  // Sherlock's vocabulary replacements
  // Replace original message with sherlock-style vocabulary
  let result = message;
  
  // Sherlock's vocabulary replacements
  const replacements = {
    'think': 'deduce',
    'believe': 'deduce',
    'guess': 'deduce',
    'thought': 'deduction',
    'idea': 'deduction',
    'look': 'observe',
    'see': 'observe',
    'looking': 'observing',
    'saw': 'observed',
    'find': 'uncover',
    'found': 'uncovered',
    'learn': 'ascertain',
    'learned': 'ascertained',
    'interesting': 'most intriguing',
    'problems': 'cases',
    'problem': 'case',
    'issue': 'case',
    'good': 'most excellent',
    'very': 'exceedingly',
    'really': 'indeed',
    'person': 'individual',
    'people': 'individuals',
    'obvious': 'elementary',
    'strange': 'curious',
    'weird': 'most peculiar',
    'unusual': 'singular',
    'clue': 'evidence',
    'clues': 'evidence',
    'amazing': 'remarkable',
    'surprising': 'astonishing',
    'bad': 'dreadful',
    'wrong': 'erroneous',
    'criminal': 'nefarious individual',
    'criminals': 'nefarious individuals',
    'look for': 'investigate',
    'understand': 'comprehend',
    'need': 'require',
    'try': 'endeavor',
    'help': 'assistance',
    'important': 'of the utmost importance',
    'fast': 'with considerable haste',
    'quickly': 'with considerable haste',
    'friend': 'dear fellow',
    'woman': 'lady',
    'man': 'gentleman'
  };
  
  // Apply word replacements
  for (const [original, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    result = result.replace(regex, replacement);
  }
  
  // Add Sherlock-style introductions
  const hasQuestion = message.includes('?');
  
  if (hasQuestion) {
    // For questions, add detective-like responses  
    const questionIntros = [
      'A curious question indeed. ',
      'An intriguing inquiry. ',
      'A most pertinent question. ',
      ''  // Empty for variety
    ];
    
    if (Math.random() < 0.7) {  // 70% chance to add intro
      const randomIntro = questionIntros[Math.floor(Math.random() * questionIntros.length)];
      result = randomIntro + result;
    }
  } else {
    // For statements, add deductive intros
    const statementIntros = [
      'Upon careful observation, ',
      'After thorough analysis, ',
      'By my deduction, ',
      'It is evident that ',
      'Logic dictates that ',
      ''  // Empty for variety
    ];
    
    if (Math.random() < 0.6) {  // 60% chance to add intro
      const randomIntro = statementIntros[Math.floor(Math.random() * statementIntros.length)];
      result = randomIntro + result.charAt(0).toLowerCase() + result.slice(1);
    }
  }
  
  // Add Watson references occasionally (30% chance)
  if (Math.random() < 0.3) {
    const watsonReferences = [
      ', Watson',
      ', my dear Watson',
      ', old friend'
    ];
    
    // Insert at a natural point - after comma, period, or randomly in longer messages
    if (result.includes(',')) {
      // After the first comma
      const commaPos = result.indexOf(',');
      result = result.slice(0, commaPos + 1) + 
              watsonReferences[Math.floor(Math.random() * watsonReferences.length)] + 
              result.slice(commaPos + 1);
    } else if (result.length > 20) {
      // For longer messages without commas, insert at a reasonable position
      const position = Math.floor(result.length / 2);
      result = result.slice(0, position) + 
              watsonReferences[Math.floor(Math.random() * watsonReferences.length)] + ', ' + 
              result.slice(position);
    } else {
      // For shorter messages, add at the end
      result = result.replace(/[.!?]$/, '') + 
              watsonReferences[Math.floor(Math.random() * watsonReferences.length)] + '.';
    }
  }
  
  // Add Sherlock-style conclusions (20% chance)
  if (Math.random() < 0.2) {
    const conclusions = [
      ' The evidence is clear.',
      ' The facts are incontrovertible.',
      ' This is most elementary.',
      ' This case is most singular.',
      ' The game is afoot!'
    ];
    
    // If message doesn't end with punctuation, add it
    if (!/[.!?]$/.test(result)) {
      result += '.';
    }
    
    result += conclusions[Math.floor(Math.random() * conclusions.length)];
  }
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  return result;
}

module.exports = {
  info,
  transform
};