document.querySelector(".clear").addEventListener('click', read);

function read() {
    var values = JSON.stringify(browser.storage.local.get(null));
    document.querySelector("textarea").value = values;
}

