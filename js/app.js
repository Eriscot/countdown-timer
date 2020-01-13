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
    eventsArray.forEach((element, index) => {
        addEvent(element, index);
    });
    countdownDiv.innerHTML = countdowns;
}, 1000);

function addEvent(element, index) {
    let timeDif = (element.getDate - new Date()) / 1000;
    if(timeDif < 0) {
        eventsArray.splice(index, 1);
        alert(`${element.getName} is happening right now. Congratulations on reaching that!`);
    } else {
        countdowns += '<div>';
        countdowns += `<h1>${element.getName}<h1>`;
        countdowns += `<h3>Months: ${Math.floor(timeDif / (60 * 60 * 24 * 30)) % 12}</h3>`;
        countdowns += `<h3>Days: ${Math.floor(timeDif / (60 * 60 * 24)) % 30}</h3>`;
        countdowns += `<h3>${timeFormat(Math.floor(timeDif / (60 * 60)) % 24)}:${timeFormat(Math.floor(timeDif / 60) % 60)}:${timeFormat(Math.floor(timeDif) % 60)}</h3>`;
        countdowns += '</div>';
    }
}

function timeFormat(time) {
    return time.toString().length === 2 ? time : "0" + time;
}