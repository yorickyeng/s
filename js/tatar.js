const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'tt-RU'; // Устанавливаем татарский язык
recognition.interimResults = true; // Если хотите видеть промежуточные результаты

recognition.onstart = () => {
    console.log('Голосовое распознавание началось, говорите...');
};

recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    document.getElementById('output').innerText = transcript;
};

recognition.onerror = (event) => {
    console.error('Ошибка распознавания: ', event.error);
};

document.getElementById('start-btn').addEventListener('click', () => {
    recognition.start();
});