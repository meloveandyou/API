(function() {
  const container = document.getElementById('pomodoro-container');

  // Insert the Pomodoro markup
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

  // Add styles just for the timer elements
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .timer-wrapper {
      position: relative;
      width: 180px;
      height: 180px;
      margin: 1rem auto;
    }

    .progress-ring-bg, .progress-ring {
      fill: none;
      stroke-linecap: round;
      stroke-width: 12;
    }

    .progress-ring-bg {
      stroke: rgba(255,255,255,0.25);
    }

    .progress-ring {
      stroke: #ffffff; 
      transition: stroke-dashoffset 1s linear;
    }

    .timer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      font-weight: 500;
      color: #333;
      text-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .controls, .mode-switch {
      display: flex;
      justify-content: center;
      gap: 0.7rem;
      margin-bottom: 1rem;
    }

    button {
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 10px;
      padding: 0.6rem 0.9rem;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      color: #333;
      transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
    }

    button:hover {
      background: rgba(255,255,255,0.7);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transform: translateY(-1px);
    }

    .mode-btn.active {
      font-weight: 600;
      background: rgba(255,255,255,0.7);
      box-shadow: 0 0 8px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.1);
    }
  `;
  document.head.appendChild(styleEl);

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
