const clrbutton = document.getElementById('clrbutton');
const target = document.getElementById('target');

let isOriginalColor = false;

clrbutton.addEventListener('click', function() {
    if (isOriginalColor) {
  target.style.backgroundColor = 'rgb(1, 35, 34)'; // Change to your desired color
}
    else {
    target.style.backgroundColor = 'rgb(168, 238, 213)'; // Change to the original color
  }
  isOriginalColor = !isOriginalColor; 
});

document.addEventListener('DOMContentLoaded', () => {
  const targetElement = document.getElementById('Sofa');
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});