function startTimer(duration, display) {
    var timer = duration
    var minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function getDraggableTime(ord) {
    const target = [ ...document.querySelectorAll('.draggable') ][ord];
    const time = Number(target.getAttribute("data-time"));
    return time
}


export { getDraggableTime, startTimer };