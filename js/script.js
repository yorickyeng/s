function displayTime() {
    let element = document.getElementById("clock");
    let now = new Date();    // Получить текущее время
    element.innerHTML = now.toLocaleTimeString(); // Отобразить время
    setTimeout(displayTime, 1000);    // Вызывать функцию каждую секунду
}
window.onload = displayTime;

const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        startBtn.textContent = 'Запись...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        
        // Применяем простую логику для добавления знаков
        let modifiedTranscript = transcript;
        
        // Примеры вопросов и восклицаний
        const questionWords = ["что", "где", "кто", "как", "почему"];
        const exclamationWords = ["ура", "давай", "отлично", "вперед"];
        
        // Проверка на вопрос
        const lowerCaseTranscript = transcript.toLowerCase();
        if (questionWords.some(word => lowerCaseTranscript.includes(word))) {
            modifiedTranscript += '?';
        }
        
        // Проверка на восклицание
        if (exclamationWords.some(word => lowerCaseTranscript.includes(word))) {
            modifiedTranscript += '!';
        }

        output.textContent = modifiedTranscript;
    };

    recognition.onerror = function(event) {
        output.textContent = 'Ошибка распознавания: ' + event.error;
    };

    recognition.onend = function() {
        startBtn.textContent = 'Начать запись';
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    output.textContent = 'Ваш браузер не поддерживает распознавание речи.';
}