// ===== NAVBAR SCROLL HIDE/SHOW =====
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    navbar.style.transform = 'translateY(-150%)';
  } else {
    // Scrolling up
    navbar.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// ===== DROPDOWN MENU =====
function toggleMenu(event) {
  event.preventDefault();
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.toggle('show');
}

// Close dropdown if clicking outside
document.addEventListener('click', function (e) {
  document.querySelectorAll('.dropdown.show').forEach(drop => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('show');
    }
  });
});

// ===== FORM VALIDATION =====
const emailForm = document.getElementById('emailForm');
const contactForm = document.getElementById('contactForm');
const descForm = document.getElementById('descForm');

if (emailForm) {
  emailForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) {
      alert('Please enter your email!');
    } else {
      alert('Email submitted successfully!');
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const contact = document.getElementById('contact').value.trim();
    if (!contact) {
      alert('Please enter your contact number!');
    } else {
      alert('Contact number submitted successfully!');
    }
  });
}

if (descForm) {
  descForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const desc = document.getElementById('description').value.trim();
    if (!desc) {
      alert('Please enter a description!');
    } else {
      alert('Description submitted successfully!');
    }
  });
}
