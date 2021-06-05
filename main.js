import { setDraggables } from './drag.js';
import { timer } from './timer.js';
import { refresh } from './refresh.js';
import { saveQueue, loadQueueFromLocalStorage, loadQueueFromDataURL, encodeDataURL, parseDataURL, loadCopyShareURL } from './storage.js';

const btn = document.getElementById("addNewExercise");

btn.addEventListener("click", () => {
    const name = document.getElementById("exercise-name").value;
    const time = document.getElementById("exercise-duration").value;
    const color = document.getElementById("exercise-color").value;

    // Create new draggable exercise
    const draggable = document.createElement("div");
    draggable.classList.add("draggable");
    draggable.setAttribute("draggable", true);
    draggable.setAttribute("data-name", name);
    draggable.setAttribute("data-time", time);
    draggable.setAttribute("data-color", color);
    draggable.style.backgroundColor = color;
    draggable.innerHTML = `<span class="name">${name}</span> <span class="duration">${time}</span>`;
    
    // Add button to remove this exercise
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete"
    removeBtn.addEventListener("click", function(event) {
        let toRemove = event.srcElement.parentElement;
        toRemove.remove();
        saveQueue();
        encodeDataURL();
    })
    draggable.appendChild(removeBtn);
    
    // Make added exercise draggable
    document.getElementById("queue").appendChild(draggable);
    setDraggables();

    // Setup timer
    document.getElementById("startTimer").addEventListener("click", function() {
        const queue = [ ...document.querySelectorAll('.draggable') ];
        const display = document.querySelector('#time');
        let curr_timer = 0;
        timer(display, curr_timer, queue);
    })

    // Refresh
    refresh();

    // Cache results
    saveQueue();
    encodeDataURL();
})

// Set up
loadCopyShareURL();
// Add example exercise
let cache = parseDataURL();
if (cache !== null) 
    loadQueueFromDataURL(btn);
else if (window.localStorage.getItem("queue") !== null)
    loadQueueFromLocalStorage(btn);
else
    btn.click(); 


// Make input selected color consistent
function selectColor(value) {
    var target = document.getElementById('selected-color');
    target.style.backgroundColor = value;
}
document.getElementById("exercise-color").addEventListener("change", function() {
    selectColor(this.value);
})
// Set initial color
selectColor(document.getElementById('exercise-color').value);
