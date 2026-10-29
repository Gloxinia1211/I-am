// ===== Эффект печатающегося текста на главном экране =====
const phrases = ["Telegram-ботов", "Mini App", "сайты-визитки", "автоматизацию"];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  // Добавляем или убираем по одной букве
  charIndex += deleting ? -1 : 1;
  typedEl.textContent = phrase.slice(0, charIndex);

  let delay = deleting ? 50 : 100;
  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    delay = 1500; // пауза, когда фраза набрана полностью
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== Плавное появление блоков при прокрутке =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Запускаем счётчики внутри появившегося блока
      entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Анимация чисел в блоке «Обо мне» =====
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const steps = 40;
  let current = 0;
  const timer = setInterval(() => {
    current += target / steps;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, 30);
}

// ===== Текущий год в подвале =====
document.getElementById("year").textContent = new Date().getFullYear();
