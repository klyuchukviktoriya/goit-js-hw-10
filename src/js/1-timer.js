import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const dateInput = document.querySelector("#datetime-picker");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate;
let intervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
            iziToast.show({
                message: "&#11198; Please choose a date in the future",
                messageColor: "white",
                backgroundColor: "#ef4040",
                position: "topRight",
            })
            startBtn.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startBtn.disabled = false;
        }
    },
};
const timePicker = flatpickr("#datetime-picker", options);
startBtn.disabled = true;
startBtn.addEventListener('click', startTimer);
function startTimer() {
    startBtn.disabled = true;
    timePicker.input.disabled = true;

    intervalId = setInterval(() => {
        const now = new Date();
        const ms = userSelectedDate - now;
        if (ms <= 0) {
            clearInterval(intervalId);
            updateTimerDisplay(0, 0, 0, 0);
            dateInput.disabled = false;
        } else {
            const { days, hours, minutes, seconds } = convertMs(ms);
            updateTimerDisplay(days, hours, minutes, seconds);
        }
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysSpan.textContent = addZero(days);
    hoursSpan.textContent = addZero(hours);
    minutesSpan.textContent = addZero(minutes);
    secondsSpan.textContent = addZero(seconds);
}
