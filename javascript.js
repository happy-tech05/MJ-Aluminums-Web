const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Open/close when clicking the hamburger
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();              // stop click from bubbling
  navLinks.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  // If menu is open AND click is NOT inside navLinks AND not on toggle button
  if (
    navLinks.classList.contains('active') &&
    !navLinks.contains(e.target) &&
    e.target !== menuToggle
  ) {
    navLinks.classList.remove('active');
  }
});

// Prevent closing when clicking inside the navbar
navLinks.addEventListener('click', (e) => {
  e.stopPropagation();
});
