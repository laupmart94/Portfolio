/* Theme toggle with persistence */
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');
function applyTheme(mode){
  if(mode==='dark'){
    root.classList.add('dark');
    toggle.textContent = '☀️ Light mode';
    toggle.setAttribute('aria-pressed','true');
  }else{
    root.classList.remove('dark');
    toggle.textContent = '🌙 Dark mode';
    toggle.setAttribute('aria-pressed','false');
  }
}
applyTheme(stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
toggle.addEventListener('click',()=>{
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyTheme(isDark ? 'dark' : 'light');
});

/* Expand/collapse project details */
document.querySelectorAll('.details-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card = btn.closest('.project-card');
    const more = card.querySelector('.more');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    more.hidden = expanded;
    btn.textContent = expanded ? 'View details' : 'Hide details';
  });
});

/* Simple contact form validation */
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg');
  if(!name || !email){
    msg.textContent = 'Please fill in both name and email.';
    msg.style.color = 'crimson';
    return;
  }
  msg.textContent = 'Thanks! Your message has been (pretend) sent.';
  msg.style.color = 'seagreen';
});
