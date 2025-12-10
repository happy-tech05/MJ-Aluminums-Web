const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');


menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();              
  navLinks.classList.toggle('active');
});


document.addEventListener('click', (e) => {
  
  if (
    navLinks.classList.contains('active') &&
    !navLinks.contains(e.target) &&
    e.target !== menuToggle
  ) {
    navLinks.classList.remove('active');
  }
});


navLinks.addEventListener('click', (e) => {
  e.stopPropagation();
});
