let remainingSeconds =  25 * 60;
let timerRunning = false;
let myInterval = null

const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
console.log(timer);

function formatTime(seconds) {
    // Calculate minutes and seconds
    const curMinutes =  Math.floor(seconds/60)
    const curSeconds = (seconds%60)
    const minutesString = curMinutes.toString().padStart(2, "0")
    const secondString = curSeconds.toString().padStart(2, "0");
    // Return formatted time
    return `${minutesString}:${secondString}`;
}
function changeTimer() {
  if(remainingSeconds > 0){
      remainingSeconds -= 1;
      updateDisplay(remainingSeconds)
  } else {
      timerRunning = false;
      clearInterval(myInterval)
  }
}

function updateDisplay(seconds) {
  timer.textContent = formatTime(seconds)
}

function startTimer() {
  timerRunning = true;
  timerStart();
  startButton.textContent = "Pause"
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(myInterval)
  myInterval = null
  startButton.textContent = "Start"
}

function resetTimer() {
  timerRunning = false;
  clearInterval(myInterval)
  myInterval = null
  startButton.textContent = "Start"
  remainingSeconds =  25 * 60;   
  timer.textContent = formatTime(remainingSeconds)
}

function timerStart() {
  myInterval = setInterval(changeTimer, 1000)
}
startButton.addEventListener("click", () => {
  if (timerRunning == false){
    startTimer()
  } else {
    pauseTimer()
  }
});

resetButton.addEventListener("click", () => {
  resetTimer()
});
