function saveQueue() {
    window.localStorage.setItem("queue", dumpQueue());
}

function loadQueueFromLocalStorage(addBtn) {
    let cache = window.localStorage.getItem("queue");
    if (cache === null) return
    try {
        cache = JSON.parse(cache);
        loadQueueFromCache(addBtn, cache)
    } catch (error) {
        console.log("Failed to parse JSON: ", cache)
    }
}

function loadQueueFromDataURL(addBtn) {
    let cache = parseDataURL();
    if (cache === null) return
    loadQueueFromCache(addBtn, cache);
}

function loadQueueFromCache(addBtn, cache) {
    cache.forEach(elem => {
        document.getElementById("exercise-name").value = elem.name;
        document.getElementById("exercise-duration").value = elem.time;
        document.getElementById("exercise-color").value = elem.color;
        addBtn.click();
    });
}

function loadCopyShareURL() {
    document.getElementById("copyShareURL").addEventListener("click", () => {
        var copyText = document.getElementById("share-url");
        copyText.style.display = "block";
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
        copyText.style.display = "none";
        alert("URL copied! Share your profile with this url: " + copyText.value);
    })
}


function encodeDataURL() {
    // Encoding
    let data = dumpQueue();
    data = encodeURLspecial(data); 
    data = encodeURI(data);

    // Construct url
    const shareURL = `${window.location.href}?data=${data}`;
    document.getElementById('share-url').innerText = shareURL;
}

function parseDataURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data');
    if (data === null) return null

    // Decoding
    data = decodeURI(data)
    data = decodeURLspecial(data);

    try {
        data = JSON.parse(data);
    } catch (error) {
        console.log('Failed to parse URL as JSON:', data)
        console.error(error);
        return null
    }
    
    return data
}


function dumpQueue() {
    const queue = [ ...document.querySelectorAll(".draggable") ];
    const cache = queue.map(elem => {
        return {
            name: elem.getAttribute("data-name"),
            time: elem.getAttribute("data-time"),
            color: elem.getAttribute("data-color"),
        }
    })
    return JSON.stringify(cache)
}


function encodeURLspecial(x) {
    URL_ESCAPES.forEach(elem => {
        x = x.replaceAll(elem[0], elem[1])
    })
    return x
}

function decodeURLspecial(x) {
    URL_ESCAPES.forEach(elem => {
        x = x.replaceAll(elem[1], elem[0])
    })
    return x
}

var URL_ESCAPES = [
    ["{", "_LB_"],
    ["}", "_RB_"],
    ["[", "_LSB_"],
    ["]", "_RSB_"],
    ["#", "_PD_"],
    ["/", "_SLASH_"],
    ["\\", "_BSLASH_"],
    ["?", "_QUESTION_"],
    ["=", "_EQUAL_"],
    [",", "_CM_"],
    [";", "_SEMICOLON_"],
    [":", "_CL_"],
    ["&", "_AND_"],
    ["@", "_AT_"],
    ["~", "_TILDE_"],
    ["^", "_CARET_"],
    ["`", "_CODE_"],
]


export { saveQueue, loadQueueFromLocalStorage, loadQueueFromDataURL, encodeDataURL, parseDataURL, loadCopyShareURL };