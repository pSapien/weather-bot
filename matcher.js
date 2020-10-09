const patterns = require('./patterns');

const createEntities = (str, pattern) => RegExp(pattern, 'i').exec(str)[1];

function matchPattern(str) {
  const result = patterns.find(item => RegExp(item.pattern, 'i').test(str));

  if (!result) return null;

  const { intent, response, pattern } = result;

  return {
    ...result,
    intent,
    response,
    entities: createEntities(str, pattern),
  }
}

module.exports = matchPattern;
