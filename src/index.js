module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = new Set(bracketsConfig.map(([open]) => open));
  const closingBrackets = new Set(bracketsConfig.map(([, close]) => close));
  const matchingBrackets = Object.fromEntries(bracketsConfig);
  
  for (const bracket of str) {
    if (openingBrackets.has(bracket)) {
      if (matchingBrackets[bracket] !== bracket || !closingBrackets.has(bracket)) {
        stack.push(bracket);
      } else {
        if (stack[stack.length - 1] === bracket) {
          stack.pop();
        } else {
          stack.push(bracket);
        }
      }
    } else if (closingBrackets.has(bracket)) {
      const lastOpeningBracket = stack.pop();
      if (matchingBrackets[lastOpeningBracket] !== bracket) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}
