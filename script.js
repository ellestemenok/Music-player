const playlist = document.getElementById('playlist');
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const timeSlider = document.getElementById('time');




playlist.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const audioSource = e.target.getAttribute('href');
        audio.src = audioSource;
        audio.load(); // Загрузить новый источник
        audio.play(); // Начать воспроизведение
    }
});

timeSlider.addEventListener('input', function () {
    const seekTime = (timeSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    wavesurfer.seekTo(seekTime / audio.duration);
});


// Функция для воспроизведения или паузы
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<img src="img/pause.png" alt="Пауза">';

    } else {
        audio.pause();
        playPauseButton.innerHTML = '<img src="img/play.png" alt="Воспроизвести">';

    }
}

// Обработчик события для кнопки воспроизведения/паузы
playPauseButton.addEventListener('click', togglePlayPause);

// Обработчик события для изменения громкости
volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value;
});

// Обработчик события, который будет вызываться при обновлении времени воспроизведения
audio.addEventListener('timeupdate', function () {
    // Обновляем текущее время и продолжительность
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    if (isNaN(audio.duration)) {
        durationSpan.textContent = "0:00";
    } else {
        durationSpan.textContent = formatTime(audio.duration);
        time.max=durationSpan;
    }

    // Обновляем ползунок времени
    timeSlider.value = (audio.currentTime / audio.duration) * 100;
});

// Обработчик события для перемотки трека
timeSlider.addEventListener('input', function () {
    const seekTime = (timeSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Функция для форматирования времени в формат "минуты:секунды"
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}