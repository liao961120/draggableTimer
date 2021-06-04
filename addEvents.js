import { setDraggables } from './drag.js';
import { getDraggableTime, startTimer } from './timer.js';

const btn = document.getElementById("addNewExercise");

btn.addEventListener("click", () => {
    const name = document.getElementById("exercise-name").value;
    const time = document.getElementById("exercise-duration").value;

    // Create new draggable exercise
    const draggable = document.createElement("div");
    draggable.classList.add("draggable");
    draggable.setAttribute("draggable", true);
    draggable.setAttribute("data-name", name);
    draggable.setAttribute("data-time", time);
    draggable.innerHTML = `<span class="name">${name}</span> <span class="duration">${time}</span>`;
    
    // Add button to remove this exercise
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete"
    removeBtn.addEventListener("click", function(event) {
        let toRemove = event.srcElement.parentElement;
        toRemove.remove();
    })
    draggable.appendChild(removeBtn);
    
    // Make added exercise draggable
    document.getElementById("queue").appendChild(draggable);
    setDraggables();

    // Test timer
    document.getElementById("startTimer").addEventListener("click", function() {
        const exerciseQueue = document.querySelectorAll(".draggable");

        // To Do: 
        //   - remove setInterval
        //   - fire an event to start next timer when count down is over 

        const display = document.querySelector('#time');
        startTimer(getDraggableTime(0), display);
    })
})

// Add first example event
btn.click();