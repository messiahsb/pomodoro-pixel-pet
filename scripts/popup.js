const FOCUS_DURATION =   25 * 60;
const LONG_DURATION =   10 * 60;
const SHORT_DURATION =   5 * 60;

let sessionType = "focus"
let timerState = "paused";
let myInterval = null
let remainingSeconds = getSessionDuration();

const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const focusButton = document.getElementById("focus-button");
const longButton = document.getElementById("long-button");
const shortButton = document.getElementById("short-button");
const petSprite = document.getElementById("pet-sprite");
console.log(timer);

startButton.addEventListener("click", () => {
  if (timerState === "paused"){
    startTimer()
  } else if (timerState === "running") {
    pauseTimer()
  }
});

focusButton.addEventListener("click", () => {
  switchSession("focus")
  updateSessionButtons()
});
longButton.addEventListener("click", () => {
switchSession("long")
updateSessionButtons()
});
shortButton.addEventListener("click", () => {
    switchSession("short")
    updateSessionButtons()
    
});

resetButton.addEventListener("click", () => {
  resetTimer()
});
function updateSessionButtons() {
  focusButton.classList.remove("active");
  shortButton.classList.remove("active");
  longButton.classList.remove("active");
  if (sessionType === "focus") {
    focusButton.classList.add("active");
  } else if (sessionType === "long") {
    longButton.classList.add("active");
} else if (sessionType === "short") {
  shortButton.classList.add("active");
}
}
function getSessionDuration() {
  if (sessionType === "focus") {
      return FOCUS_DURATION;
  } else if (sessionType === "long") {
       return LONG_DURATION;
  } else if (sessionType === "short"){
     return SHORT_DURATION;
  }
  throw new Error("Invalid session type");
}

function switchSession(type) {
    if (type === "short" || type === "long" || type === "focus") {
      pauseTimer()
        sessionType = type
    } else {
        throw new Error("Invalid session type");
    }
    remainingSeconds = getSessionDuration()
    updateDisplay()
}
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
      updateDisplay()
      if (remainingSeconds <= 0) {
        clearInterval(myInterval)
            myInterval = null
           startButton.textContent = "Start"
             timerState = "completed";
               timer.textContent = "COMPLETED"
      } 
  } 
  } 

function updateDisplay() {
  timer.textContent = formatTime(remainingSeconds)
}

function startTimer() {
  if( timerState === "paused"){
  timerState = "running";
  timerStart();
  startButton.textContent = "Pause"
  }
}

function pauseTimer() {
  timerState = "paused";
  clearInterval(myInterval)
  myInterval = null
  startButton.textContent = "Start"
}

function resetTimer() {
  pauseTimer()
    remainingSeconds = getSessionDuration();
  updateDisplay()
}

function timerStart() {
  myInterval = setInterval(changeTimer, 1000)
}

updateSessionButtons()