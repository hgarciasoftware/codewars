const Dragon = function (n) {
  if ( !test(n) ) return '';

  const d0 = 'Fa';
  let instructions = d0.split('');

  while (n-- > 0) {
    instructions = instructions
      .map(w => w === 'a' ? 'aRbFR' : w === 'b' ? 'LFaLb' : w)
      .join('')
      .split('');
  }

  return instructions.join('').replace(/a|b/g, '');
};

const test = function (n) {
  if (typeof n !== 'number') return false;
  if (n < 0) return false;
  if (n % 1 !== 0) return false;

  return true;
};
