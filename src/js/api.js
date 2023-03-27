export function getMotivationalPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponse = [
        'images/motivational-pictures/darts.webp',
        'images/motivational-pictures/mountain.webp',
        'images/motivational-pictures/passion.webp',
      ]
      resolve(mockResponse);
    }, 3000);
  })
}