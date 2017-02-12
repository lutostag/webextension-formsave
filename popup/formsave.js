document.querySelector(".clear").addEventListener('click', read);

function read() {
    var reading = browser.storage.local.get();
    reading.then((results) => {
        document.querySelector("textarea").value = JSON.stringify(results);
    });
}

