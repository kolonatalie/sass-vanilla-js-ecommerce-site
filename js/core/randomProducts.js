export function getRandomProducts(productsArray, count) {
  
  const shuffled = [...productsArray];
  let currentIndex = shuffled.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex], shuffled[currentIndex]
    ];
  }
  
  return shuffled.slice(0, count);
}