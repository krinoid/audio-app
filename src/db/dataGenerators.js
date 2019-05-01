const faker = require('faker');

// generate random integer within [min, max]
const generateRandomNumber = (_min, _max) => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// source: https://stackoverflow.com/questions/7467381/capitalize-the-first-letter-of-every-word
const capitalize = (str = '') =>
  str
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

// generators -- array of functions that return strings or plain strings
// [() => string | string]
const generateRandomValue = (generators = []) => {
  if (!Array.isArray(generators) || generators.length === 0)
    throw new Error('generators params must be an non-empty array');

  const randomIndex = generateRandomNumber(0, generators.length - 1);
  const randomValue = generators[randomIndex];
  return typeof randomValue === 'function' ? randomValue() : randomValue;
};

const generateRandomName = () => {
  const baseName = generateRandomValue([
    faker.name.findName,
    faker.company.companyName,
  ]);
  const baseNameProcessed = baseName
    .replace('-', '&')
    .replace('LLC', '')
    .replace('Inc', '')
    .replace('MD', '')
    .replace('Dr. ', '')
    .replace('Ms. ', '')
    .replace('Mrs. ', '')
    .replace('Mr. ', '')
    .replace('Jr.', '');

  const optionalWord = generateRandomValue([
    faker.commerce.color,
    faker.company.bsBuzz,
  ]);
  const useOptionalWord = Math.random() > 0.75;
  const finalName = useOptionalWord
    ? `${optionalWord} ${baseNameProcessed}`
    : baseNameProcessed;

  return capitalize(finalName).trim();
};

const generateRandomTitle = () => {
  const firstPart = generateRandomValue([
    faker.commerce.color,
    faker.commerce.productAdjective,
    faker.company.bsBuzz,
  ]);
  const secondPart = generateRandomValue([
    faker.hacker.adjective,
    faker.commerce.color,
    faker.company.bsBuzz,
    faker.random.word,
    faker.commerce.productName,
  ]);

  // in some cases, we want to have just a single-part title
  const useOnePart = Math.random() > 0.7;
  const partToUse = generateRandomNumber(0, 1);
  const titleParts = [firstPart, secondPart];

  const finalTitle = useOnePart
    ? titleParts[partToUse]
    : `${firstPart} ${secondPart}`;

  return capitalize(finalTitle);
};

const genres = [
  'Jazz',
  'Rock',
  'Black Metal',
  'Blues',
  'Disco',
  'Pop',
  'Goa',
  'House',
];
const generateRandomGenre = generateRandomValue.bind(null, genres);

module.exports = {
  generateRandomNumber,
  generateRandomName,
  generateRandomTitle,
  genres,
  generateRandomGenre,
};
