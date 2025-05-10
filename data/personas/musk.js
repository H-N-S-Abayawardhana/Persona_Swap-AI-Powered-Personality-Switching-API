/**
 * Elon Musk Persona Transformation
 */

const info = {
  name: 'Elon Musk',
  description: 'Transforms text to sound like tech entrepreneur Elon Musk',
  examples: [
    {
      original: 'This is a good idea.',
      transformed: 'This is insanely great... potentially revolutionary! 🚀'
    }
  ]
};

/**
 * Transform message into Elon Musk-like speech
 * @param {string} message - The original message to transform
 * @returns {string} - The transformed message in Elon's style
 */
function transform(message) {
  if (!message || typeof message !== 'string') {
    return '';
  }

  // Split the message into sentences for more granular transformation
  const sentences = message.split(/(?<=[.!?])\s+/);
  let result = [];

  // Use a counter to add tech topics randomly but not too frequently
  let techTopicCounter = 0;

  for (let sentence of sentences) {
    // Clean the sentence
    sentence = sentence.trim();
    if (!sentence) continue;

    // Apply Elon's speech patterns
    sentence = applyElonSpeechPatterns(sentence);

    // Add technology references occasionally
    techTopicCounter++;
    if (techTopicCounter % 3 === 0) {
      sentence = addTechReference(sentence);
    }

    result.push(sentence);
  }

  // Join sentences back together
  let transformedMessage = result.join(' ');

  // Add Elon's signature emojis
  transformedMessage = addElonEmojis(transformedMessage);

  return transformedMessage;
}

/**
 * Apply Elon Musk's speech patterns to a sentence
 * @param {string} sentence - Input sentence
 * @returns {string} - Transformed sentence
 */
function applyElonSpeechPatterns(sentence) {
  // Remove ending punctuation for processing
  const punctuation = sentence.match(/[.!?]$/);
  let cleanSentence = sentence.replace(/[.!?]$/, '');

  // Apply Elon-isms with probabilities to avoid overuse
  
  // 1. Extreme adjectives
  if (Math.random() < 0.4) {
    cleanSentence = cleanSentence
      .replace(/\bgood\b/gi, 'insanely great')
      .replace(/\bbad\b/gi, 'fundamentally flawed')
      .replace(/\binteresting\b/gi, 'mind-blowing')
      .replace(/\bdifficult\b/gi, 'extremely hard, but doable')
      .replace(/\bimpossible\b/gi, 'just a matter of innovation')
      .replace(/\bimportant\b/gi, 'absolutely critical');
  }

  // 2. Add "actually" and "literally" occasionally
  if (Math.random() < 0.3) {
    cleanSentence = addFiller(cleanSentence, ["actually", "literally", "fundamentally", "obviously"]);
  }

  // 3. Add "...but" statements with probability
  if (Math.random() < 0.25 && !cleanSentence.includes('but')) {
    const butStatements = [
      "but we need to innovate faster",
      "but the potential is enormous",
      "but that's just the beginning",
      "but we're making progress",
      "but physics still applies"
    ];
    cleanSentence += ", " + butStatements[Math.floor(Math.random() * butStatements.length)];
  }

  // 4. Add qualifying statements with probability
  if (Math.random() < 0.3) {
    const qualifiers = [
      "I think",
      "In my view",
      "Based on first principles",
      "From a physics standpoint"
    ];
    if (cleanSentence[0] === cleanSentence[0].toLowerCase()) {
      // Only add qualifier if sentence doesn't start with capital letter
      cleanSentence = qualifiers[Math.floor(Math.random() * qualifiers.length)] + ", " + cleanSentence;
    }
  }

  // 5. Add hyperbole with probability
  if (Math.random() < 0.35) {
    const hyperboles = [
      "... potentially revolutionary",
      "... could change everything",
      "... this is just the beginning",
      "... the implications are massive"
    ];
    cleanSentence += hyperboles[Math.floor(Math.random() * hyperboles.length)];
  }

  // 6. Triple dots in the middle of sentence
  if (Math.random() < 0.25 && cleanSentence.length > 15) {
    const words = cleanSentence.split(' ');
    const insertPosition = Math.floor(words.length / 2);
    words.splice(insertPosition, 0, '...');
    cleanSentence = words.join(' ');
  }

  // 7. Capitalize certain tech words
  cleanSentence = cleanSentence
    .replace(/\b(ai|artificial intelligence)\b/gi, 'AI')
    .replace(/\b(ev|electric vehicle|electric vehicles)\b/gi, 'EV')
    .replace(/\b(sustainable energy)\b/gi, 'Sustainable Energy');

  // 8. Restore or add stronger punctuation
  if (punctuation) {
    // Randomly upgrade punctuation
    if (punctuation[0] === '.' && Math.random() < 0.4) {
      cleanSentence += '!';
    } else {
      cleanSentence += punctuation[0];
    }
  } else {
    // Add punctuation if missing
    cleanSentence += Math.random() < 0.3 ? '!' : '.';
  }

  return cleanSentence.charAt(0).toUpperCase() + cleanSentence.slice(1);
}

/**
 * Add tech references to a sentence
 * @param {string} sentence - Input sentence
 * @returns {string} - Sentence with tech reference
 */
function addTechReference(sentence) {
  const techReferences = [
    "This is similar to what we're doing with Tesla's FSD.",
    "Think of it like SpaceX's approach to reusability.",
    "At Neuralink, we're solving similar problems.",
    "This reminds me of the challenges at The Boring Company.",
    "It's all about sustainable innovation.",
    "AI will be transformative here.",
    "First principles thinking is key to this.",
    "We need to become a multi-planetary species for reasons like this."
  ];

  // Add a tech reference as a new sentence
  return sentence + " " + techReferences[Math.floor(Math.random() * techReferences.length)];
}

/**
 * Add filler words to a sentence
 * @param {string} sentence - Input sentence
 * @param {Array<string>} fillers - Filler words to potentially add
 * @returns {string} - Sentence with fillers
 */
function addFiller(sentence, fillers) {
  const filler = fillers[Math.floor(Math.random() * fillers.length)];
  const words = sentence.split(' ');
  
  // Insert filler at a sensible position (not first or last word)
  if (words.length > 2) {
    const position = Math.floor(Math.random() * (words.length - 2)) + 1;
    words.splice(position, 0, filler);
    return words.join(' ');
  }
  
  return filler + " " + sentence;
}

/**
 * Add Elon's signature emojis
 * @param {string} message - Input message
 * @returns {string} - Message with emojis
 */
function addElonEmojis(message) {
  const elonEmojis = ['🚀', '⚡', '🤖', '🧠', '🔋', '🛰️', '🔥'];
  
  // Add emojis with 50% probability
  if (Math.random() < 0.5) {
    // Add 1-2 emojis
    const numEmojis = Math.random() < 0.5 ? 1 : 2;
    let selectedEmojis = [];
    
    for (let i = 0; i < numEmojis; i++) {
      const emoji = elonEmojis[Math.floor(Math.random() * elonEmojis.length)];
      if (!selectedEmojis.includes(emoji)) {
        selectedEmojis.push(emoji);
      }
    }
    
    // Add emojis at the end
    message += ' ' + selectedEmojis.join('');
  }
  
  return message;
}

module.exports = {
  info,
  transform
};