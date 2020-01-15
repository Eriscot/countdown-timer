let submitButton = document.querySelector('#submitButton');
let eventName = document.querySelector('#eventName');
let eventNameError = document.querySelector('#eventNameError');
let eventDate = document.querySelector('#eventDate');
let eventDateError = document.querySelector('#eventDateError');
let eventTime = document.querySelector('#eventTime');
let eventErrors = document.querySelectorAll('.form-text');
let countdownDiv = document.querySelector('#countdown');
let countdowns = '';
let isEditing = -1;

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

    get getId() {
        return this.id;
    }

    set setName(name) {
        this.name = name;
    }

    set setDate(date) {
        this.date = date;
    }

    get getISODate() {
        return this.date.getFullYear() +
              '-' + timeFormat(this.date.getMonth() + 1) +
              '-' + timeFormat(this.date.getDate());
    }
    get getISOTime() {
        return timeFormat(this.date.getHours()) + ':' + timeFormat(this.date.getMinutes());
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
    } else if(isEditing === -1) {
        eventsArray.push(new Event(eventName.value, new Date(eventDate.value + " " + eventTime.value)));
    } else {
        eventsArray[isEditing].setName = eventName.value;
        eventsArray[isEditing].setDate = new Date(eventDate.value + " " + eventTime.value);
        isEditing = -1;
    }
    eventName.value = '';
    eventDate.value = '';
    eventTime.value = '00:00';
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
        deleteEvent(element.getId, index);
        alert(`${element.getName} is happening right now. Congratulations on reaching that!`);
    } else {
        countdowns += `<div id="${element.getId}">`;
        countdowns += `<h1>${element.getName}<h1>`;
        countdowns += `<h3>Months: ${Math.floor(timeDif / (60 * 60 * 24 * 30)) % 12}</h3>`;
        countdowns += `<h3>Days: ${Math.floor(timeDif / (60 * 60 * 24)) % 30}</h3>`;
        countdowns += `<h3>${timeFormat(Math.floor(timeDif / (60 * 60)) % 24)}:${timeFormat(Math.floor(timeDif / 60) % 60)}:${timeFormat(Math.floor(timeDif) % 60)}</h3>`;
        countdowns += `<div class="form-group"><button class="btn btn-primary" onclick="editEvent(${index})">Edit</button><button class="btn btn-danger" onclick="deleteEvent(${element.getId}, ${index})">Delete</button></div>`;
        countdowns += '</div>';
    }
}

function deleteEvent(elementId, index) {
    eventsArray.splice(index, 1);
    document.getElementById('' + elementId).remove();
}

function editEvent(index) {
    isEditing = index;
    eventName.value = eventsArray[index].getName;
    eventDate.value = eventsArray[index].getISODate;
    eventTime.value = eventsArray[index].getISOTime;
}

function timeFormat(time) {
    return time.toString().length === 2 ? time : "0" + time;
}