// Theme Toggle
const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeIcon.textContent = '☀️';
}

toggleButton.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Typed.js for typing effect
const typed = new Typed('#typed-text', {
  strings: ['I am a Web Developer.', 'I am a Freelancer.', 'I am a Software Enthusiast.'],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});