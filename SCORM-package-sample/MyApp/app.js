const scorm = pipwerks.SCORM;

function on() {
    scorm.version = '2004';
    const respuesta = scorm.init();
}

function off() {
    const respuesta = scorm.quit();
}

function completar() {
    const respuesta = scorm.set("cmi.completion_status", "completed");
}

window.onload = () => {
    on();
}

window.onunload = () => {
    off();
}

const getStatus = document.querySelector('#getStatus');
const setStatusPassed = document.querySelector('#setStatusPassed');
const setStatusFailed = document.querySelector('#setStatusFailed');
const setScore = document.querySelector('#setScore');

getStatus.addEventListener('click', () => {
    const displayStatus = document.querySelector('#displayStatus');
    displayStatus.textContent = scorm.get("cmi.success_status");
    scorm.set("cmi.completion_status", "completed");
})

setStatusPassed.addEventListener('click', () => {
    const displayStatus = document.querySelector('#displayStatus');
    scorm.set("cmi.success_status", "passed");
    displayStatus.textContent = 'Is now Passed';
    scorm.set("cmi.completion_status", "completed");
})

setStatusFailed.addEventListener('click', () => {
    const displayStatus = document.querySelector('#displayStatus');
    scorm.set("cmi.success_status", "failed");
    displayStatus.textContent = 'Is now Failed';
    scorm.set("cmi.completion_status", "completed");
})

var score = 0;

setScore.addEventListener('click', (e) => {
    const form = document.querySelector('form');
    score = document.querySelector('#inputScore').value;
    scorm.set("cmi.score.raw", score);
    scorm.set("cmi.score.scaled", score/100);
    scorm.set("cmi.scaled_passing_score", score/100);
    scorm.set("cmi.score.max", 100);
    scorm.set("cmi.score.min", 0);
    scorm.save();
    scorm.set("cmi.completion_status", "completed");

    if (score >= 80) {
        scorm.set("cmi.success_status", "passed");
        displayStatus.textContent = 'Is now Passed';
    } else {
        scorm.set("cmi.success_status", "failed");
        displayStatus.textContent = 'Is now Failed';
    }

    e.preventDefault();
    form.reset();
})