export function getMotivationalPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponse = [
        '/static/images/motivational-pictures/darts.webp',
        '/static/images/motivational-pictures/mountain.webp',
        '/static/images/motivational-pictures/passion.webp',
      ]
      resolve(mockResponse);
    }, 3000);
  })
}