// takes a string and an array then returns a formatted string

const joinArrayWithComa = (string, item) => {
  if (item.length > 1 && string.length > 1) {
    return `${string}s: ${item.join(', ')}`;
  } else if (item.length === 1 && string === '') {
    return `${item}`;
  } else if (item.length > 1 && string === '') {
    return `${item.join(', ')}`;
  } else {
    return `${string}: ${item}`;
  }
};

export default joinArrayWithComa;
