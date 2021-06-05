function timer(display, curr_timer, queue) {
    var t = startTimer(display, curr_timer, queue);
    var id = t.id;
    var duration = t.duration;
    
    // Close timer
    setTimeout(function() { 
        clearInterval(id);
        beepLong();
        display.textContent = '00:00';
        if (curr_timer < queue.length - 1) {
            timer(display, curr_timer + 1, queue);
        }
    }, (duration + 1) * 1000)
}


function startTimer(display, curr_timer, queue) {
    var duration = getDraggableTime(curr_timer, queue);
    var timer = duration
    //var minutes, seconds;
    const id = setInterval(function () {
        display.textContent = formatDuration(timer);
        display.style.color = getDraggableColor(curr_timer, queue);
        const title = document.getElementById("curr-exercise");
        title.innerText = getDraggableName(curr_timer, queue);
        title.style.backgroundColor = getDraggableColor(curr_timer, queue);

        if (--timer < 0) timer = duration;
        if (timer < 3) beepShort();
    }, 1000);

    return { id: id, duration: duration };
}



function getDraggableTime(ord, queue) {
    return Number(queue[ord].getAttribute("data-time"));
}

function getDraggableColor(ord, queue) {
    return queue[ord].style.backgroundColor;
}

function getDraggableName(ord, queue) {
    return queue[ord].getAttribute("data-name");
}

function formatDuration(duration) {
    var minutes, seconds;
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}


function beepLong() {
   var snd = document.getElementById("beep-long");
   snd.play();
}   

function beepShort() {
    var snd = document.getElementById("beep-short");
    snd.play();
}

export { timer, formatDuration, getDraggableColor };