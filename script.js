// ===== THEME TOGGLE =====
const root = document.documentElement;          // <html> element
const btn = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');   // 'dark' | 'light' | null

function applyTheme(mode){
  // Ensure only one class is set at a time
  root.classList.remove('dark','light');
  if (mode === 'dark') {
    root.classList.add('dark');
    btn.textContent = '☀️ Light mode';
    btn.setAttribute('aria-pressed','true');
  } else {
    root.classList.add('light');
    btn.textContent = '🌙 Dark mode';
    btn.setAttribute('aria-pressed','false');
  }
}

// Initial theme: use saved choice or system preference
applyTheme(stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

// Toggle on click + save preference
btn.addEventListener('click', () => {
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});


// ===== PROJECT "VIEW DETAILS" BUTTONS (keep this if you had it) =====
document.querySelectorAll('.details-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const more = card.querySelector('.more');
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    more.hidden = expanded;
    button.textContent = expanded ? 'View details' : 'Hide details';
  });
});


// ===== SIMPLE CONTACT FORM VALIDATION (optional) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('msg');
    if (!name || !email) {
      msg.textContent = 'Please fill in both name and email.';
      msg.style.color = 'crimson';
    } else {
      msg.textContent = 'Thanks! Your message has been (pretend) sent.';
      msg.style.color = 'seagreen';
    }
  });
}
