let submitButton = document.getElementById('submitButton');
let eventName = document.getElementById('eventName');
let eventNameError = document.getElementById('eventNameError');
let eventDate = document.getElementById('eventDate');
let eventDateError = document.getElementById('eventDateError');
let eventTime = document.getElementById('eventTime');
let eventErrors = document.getElementsByClassName('form-text');
let countdownDiv = document.getElementById('countdown');
let countdowns = '';

let eventsArray = [];

class Event {
    constructor(name, date, time) {
        this.id = Math.floor(Math.random() * 100000000);
        this.name = name;
        this.date = date;
        this.time = time || '00:00';
    }

    get getName() {
        return this.name;
    }

    get getDate() {
        return this.date;
    }

    set setName(name) {
        this.name = name;
    }

    set setDate(date) {
        this.date = date;
    }
} 

submitButton.addEventListener('click', () => {
    if(!eventName.value) {
        eventNameError.innerText = 'The field is empty. Please fill in!';
        setTimeout(() => {
            eventNameError.innerText = '';
        }, 3000);
        return;
    } else if(!eventDate.value) {
        eventDateError.innerText = 'The field is empty. Please fill in!';
        setTimeout(() => {
            eventDateError.innerText = '';
        }, 3000);
        return;
    } else {
        eventsArray.push(new Event(eventName.value, new Date(eventDate.value + " " + eventTime.value)));
    }
});

setInterval(() => {
    countdowns = '';
    eventsArray.forEach((element) => {
        addEvent(element);
    });
    countdownDiv.innerHTML = countdowns;
}, 1000);

function addEvent(element) {
    countdowns += '<div>';
    countdowns += `<h1>${element.getName}<h1>`;
    countdowns += `<h3>Seconds: ${(element.getDate - new Date()) / 1000}</h3>`;
    countdowns += '</div>';
}