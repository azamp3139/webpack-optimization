export function getMotivationalPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponse = [
        'images/motivational-pictures/dart.jpg',
        'images/motivational-pictures/mountain.jpg',
        'images/motivational-pictures/passion.jpg',
      ]
    }, 3000);
  })
}