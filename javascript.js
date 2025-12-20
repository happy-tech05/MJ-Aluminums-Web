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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const notification = document.getElementById("notification");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Show "sending" notification
    notification.textContent = "Sending message...";
    notification.style.display = "block";
    notification.classList.remove("error");

    fetch("http://localhost:3000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, email, message })
    })
    .then(res => res.json())
    .then(data => {
      notification.textContent = "✅ Message sent successfully!";
      notification.classList.remove("error");
      notification.style.display = "block";

      // hide after 4 seconds
      setTimeout(() => { notification.style.display = "none"; }, 4000);

      form.reset();
    })
    .catch(err => {
      console.error(err);
      notification.textContent = "❌ Failed to send message. Try again.";
      notification.classList.add("error");
      notification.style.display = "block";

      setTimeout(() => { notification.style.display = "none"; }, 4000);
    });
  });
});


