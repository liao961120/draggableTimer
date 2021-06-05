import { formatDuration, getDraggableColor } from './timer.js';

function refresh() {
    
    const curr = document.getElementById("curr-exercise");
    const first = document.querySelector(".draggable");
    const timer = document.getElementById("time");

    // Update shown exercise on the timer
    curr.innerText = first.getAttribute("data-name");
    curr.style.backgroundColor =  document.querySelector(".draggable").style.backgroundColor;
    // Update timer's number
    timer.innerText = formatDuration(first.getAttribute("data-time"));
    timer.style.color = getDraggableColor(0, [ first ] );
}

export { refresh };