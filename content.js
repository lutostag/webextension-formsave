var texts = document.querySelectorAll('textarea', 'div[contenteditable="true"]');
texts.forEach(function(text) {
    text.addEventListener('input', changeHandler, false);
    text.addEventListener('change', changeHandler);
});


function changeHandler(calledEvent) {
    var target = calledEvent.target;
    var item = {
        url: document.URL,
        id: target.id,
        time: new Date(),
        content: target.value
    };
    var key = item.url + '##' + item.id;
    browser.storage.local.set({[key]: item});
}
