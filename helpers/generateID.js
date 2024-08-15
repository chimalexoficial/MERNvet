
const generateID = () => {
  const random = Math.random().toString(32).substring(2);
  return random;
}

export default generateID;