// ===== THEME TOGGLE =====
const root = document.documentElement;          // <html> element
const btn = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');   // 'dark' | 'light' | null

function applyTheme(mode) {
  // Remove old theme classes
  root.classList.remove('dark', 'light');
  if (mode === 'dark') {
    root.classList.add('dark');
    btn.textContent = '☀️ Light mode';
    btn.setAttribute('aria-pressed', 'true');
  } else {
    root.classList.add('light');
    btn.textContent = '🌙 Dark mode';
    btn.setAttribute('aria-pressed', 'false');
  }
}

// Initial theme (saved or system)
applyTheme(
  stored ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

// Button click toggles theme
btn.addEventListener('click', () => {
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});


// ===== PROJECT "VIEW DETAILS" BUTTONS =====
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


// ===== CONTACT FORM (Formspree + Custom Success Message) =====
const form = document.getElementById('contactForm');
if (form) {
  const msg = document.getElementById('msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent redirect

    msg.textContent = 'Sending...';
    msg.style.color = '';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        msg.textContent = '✅ Thanks, your message has been sent!';
        msg.style.color = 'seagreen';
        form.reset();

        // Optional: fade out message after 5 seconds
        setTimeout(() => { msg.textContent = ''; }, 5000);
      } else {
        msg.textContent = '❌ Oops! Something went wrong. Please try again.';
        msg.style.color = 'crimson';
      }
    } catch (error) {
      msg.textContent = '⚠️ Network error. Please try again later.';
      msg.style.color = 'crimson';
    }
  });
}
