// Плавное появление блоков при прокрутке
document.add

// Скрипт для плавного появления
const sections = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    if (sectionTop < screenPosition) {
      section.classList.add('appear');
    }
  });
});

// Функция для добавления класса "show" при прокрутке страницы
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('.section');

  sections.forEach(function (section) {
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionPosition < windowHeight - 100) {
      section.classList.add('show');
    } else {
      section.classList.remove('show');
    }
  });
});

const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    startBtn.textContent = 'Запись...';
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = `Распознанный текст: ${transcript}`;
  };

  recognition.onerror = function (event) {
    output.textContent = `Ошибка распознавания: ${event.error}`;
  };

  recognition.onend = function () {
    startBtn.textContent = 'Начать запись';
  };

  startBtn.addEventListener('click', () => {
    recognition.start();
  });
} else {
  output.textContent = 'Ваш браузер не поддерживает распознавание речи.';
}
