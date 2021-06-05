function saveQueue() {
    const queue = [ ...document.querySelectorAll(".draggable") ];
    const cache = queue.map(elem => {
        return {
            name: elem.getAttribute("data-name"),
            time: elem.getAttribute("data-time"),
            color: elem.getAttribute("data-color"),
        }
    })

    window.localStorage.setItem("queue", JSON.stringify(cache));
}

function loadQueue(addBtn) {
    let cache = window.localStorage.getItem("queue");
    if (cache === null) return

    cache = JSON.parse(cache)
    cache.forEach(elem => {
        document.getElementById("exercise-name").value = elem.name;
        document.getElementById("exercise-duration").value = elem.time;
        document.getElementById("exercise-color").value = elem.color;
        addBtn.click();
    });
}

export { saveQueue, loadQueue };