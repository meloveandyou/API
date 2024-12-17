(function() {
  const container = document.getElementById('pomodoro-container');

  container.innerHTML = `
    <div class="timer-wrapper">
      <svg width="180" height="180">
          <circle class="progress-ring-bg" cx="90" cy="90" r="80" />
          <circle class="progress-ring" cx="90" cy="90" r="80" />
      </svg>
      <div class="timer" id="time-display">25:00</div>
    </div>
    <div class="controls">
      <button id="start-btn">Start</button>
      <button id="pause-btn">Pause</button>
      <button id="reset-btn">Reset</button>
    </div>
    <div class="mode-switch">
      <button class="mode-btn active" data-minutes="25">Focus</button>
      <button class="mode-btn" data-minutes="5">Break</button>
      <button class="mode-btn" data-minutes="15">Long Break</button>
    </div>
  `;

  const timeDisplay = document.getElementById('time-display');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const modeButtons = document.querySelectorAll('.mode-btn');
  const progressRing = document.querySelector('.progress-ring');
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  progressRing.style.strokeDasharray = circumference;
  progressRing.style.strokeDashoffset = 0;

  let currentMode = 25; 
  let timeInSeconds = currentMode * 60;
  let timerInterval = null;
  let totalTime = timeInSeconds;

  function updateDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    updateProgress();
  }

  function updateProgress() {
    const fraction = timeInSeconds / totalTime;
    const offset = circumference - (fraction * circumference);
    progressRing.style.strokeDashoffset = offset;
  }

  function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      timeInSeconds--;
      if (timeInSeconds < 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Time’s up!');
        return;
      }
      updateDisplay();
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    pauseTimer();
    timeInSeconds = currentMode * 60;
    totalTime = timeInSeconds;
    updateDisplay();
  }

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = parseInt(btn.getAttribute('data-minutes'), 10);
      resetTimer();
    });
  });

  updateDisplay();
})();
