let audio, playPauseButton, volumeSlider, currentTimeSpan, durationSpan;
let fft, canvas, ctx;

function setup() {
  audio = document.getElementById('audio');
  playPauseButton = document.getElementById('play-pause');
  volumeSlider = document.getElementById('volume');
  currentTimeSpan = document.getElementById('current-time');
  durationSpan = document.getElementById('duration');
  canvas = document.getElementById('visualizer');
  ctx = canvas.getContext('2d');

  createCanvas(canvas.width, canvas.height);

  fft = new p5.FFT();
  fft.setInput(audio);

  playPauseButton.addEventListener('click', togglePlayPause);
  volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value;
  });
}

function draw() {
  const spectrum = fft.analyze();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < spectrum.length; i++) {
    const value = spectrum[i];
    const barHeight = map(value, 0, 255, 0, canvas.height);
    const barWidth = canvas.width / spectrum.length;
    const x = i * barWidth;
    const y = canvas.height - barHeight;
    ctx.fillStyle = '#000'; // Цвет волн
    ctx.fillRect(x, y, barWidth, barHeight);
  }

  currentTimeSpan.textContent = formatTime(audio.currentTime);
  if (!isNaN(audio.duration)) {
    durationSpan.textContent = formatTime(audio.duration);
  }
}