module.exports = text => {
  return text
    .normalize('NFD')
    .replace(/( )/g, '-')
    .replace(/[\u0300-\u036f]/gi, '')
    .toLowerCase();
};
